import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { useAccount } from '../../providers/AccountProvider';
import { dataHistoryService, MetricWithHistory, DataHistoryRecord } from '../../services/dataHistoryService';
import { CartesianChart, Line } from 'victory-native';
import { Circle } from '@shopify/react-native-skia';

type TimeframeFilter = 'all' | '6mo' | '1mo';

type MetricGraphState = {
  metricId: string;
  timeframe: TimeframeFilter;
};

type ChartDataPoint = {
  timestamp: number;
  current_status: number;
  min: number;
  max: number;
  isInRange: boolean;
};

export default function DataHistoryScreen() {
  const { user } = useAccount();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metricsWithHistory, setMetricsWithHistory] = useState<MetricWithHistory[]>([]);
  const [graphStates, setGraphStates] = useState<{ [metricId: string]: TimeframeFilter }>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const data = await dataHistoryService.fetchAllHistoryGroupedByMetric(user.id);
      setMetricsWithHistory(data);

      const initialStates: { [metricId: string]: TimeframeFilter } = {};
      data.forEach((metric) => {
        initialStates[metric.metric_id] = 'all';
      });
      setGraphStates(initialStates);
    } catch (err) {
      console.error('Error loading data history:', err);
      setError('Failed to load data history');
    } finally {
      setLoading(false);
    }
  };

  const handleTimeframeChange = (metricId: string, timeframe: TimeframeFilter) => {
    setGraphStates((prev) => ({
      ...prev,
      [metricId]: timeframe,
    }));
  };

  const transformToChartData = (records: DataHistoryRecord[]): ChartDataPoint[] => {
    return records.map((record) => ({
      timestamp: new Date(record.timestamp).getTime(),
      current_status: record.current_status,
      min: record.min,
      max: record.max,
      isInRange: record.current_status >= record.min && record.current_status <= record.max,
    }));
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-4">Loading data history...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-red-600 text-center">{error}</Text>
        <TouchableOpacity onPress={loadData} className="mt-4">
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (metricsWithHistory.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-gray-600 text-center">
          No data history available. Start tracking metrics in Score Cards to see historical trends.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {metricsWithHistory.map((metricData) => {
          const timeframe = graphStates[metricData.metric_id] || 'all';
          const filteredHistory = dataHistoryService.filterByTimeframe(
            metricData.history,
            timeframe
          );

          if (filteredHistory.length === 0) {
            return (
              <View key={metricData.metric_id} className="mb-8">
                <Text className="text-lg font-semibold mb-2">{metricData.metric_description}</Text>
                <View className="flex-row gap-2 mb-4">
                  <TouchableOpacity
                    onPress={() => handleTimeframeChange(metricData.metric_id, 'all')}
                  >
                    <Text>All Time</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTimeframeChange(metricData.metric_id, '6mo')}
                  >
                    <Text>6-mo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTimeframeChange(metricData.metric_id, '1mo')}
                  >
                    <Text>1-mo</Text>
                  </TouchableOpacity>
                </View>
                <Text className="text-gray-500 text-center py-8">
                  No data available for this timeframe
                </Text>
                <View className="h-px bg-gray-200 mt-4" />
              </View>
            );
          }

          const chartData = transformToChartData(filteredHistory);

          return (
            <MetricGraph
              key={metricData.metric_id}
              metricDescription={metricData.metric_description}
              chartData={chartData}
              timeframe={timeframe}
              onTimeframeChange={(newTimeframe) =>
                handleTimeframeChange(metricData.metric_id, newTimeframe)
              }
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

type MetricGraphProps = {
  metricDescription: string;
  chartData: ChartDataPoint[];
  timeframe: TimeframeFilter;
  onTimeframeChange: (timeframe: TimeframeFilter) => void;
};

function MetricGraph({
  metricDescription,
  chartData,
  timeframe,
  onTimeframeChange,
}: MetricGraphProps) {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 32;

  const formattedData = chartData.map((point) => ({
    x: point.timestamp,
    current_status: point.current_status,
    min: point.min,
    max: point.max,
    isInRange: point.isInRange,
  }));

  const formatXLabel = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <View className="mb-8">
      <Text className="text-lg font-semibold mb-2">{metricDescription}</Text>

      <View className="flex-row gap-2 mb-4">
        <TouchableOpacity
          onPress={() => onTimeframeChange('all')}
        >
          <Text>All Time</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTimeframeChange('6mo')}
        >
          <Text>6-mo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTimeframeChange('1mo')}
        >
          <Text>1-mo</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 300, width: chartWidth }}>
        <CartesianChart
          data={formattedData}
          xKey="x"
          yKeys={['current_status', 'min', 'max']}
          axisOptions={{
            formatXLabel: formatXLabel,
          }}
        >
            {({ points, chartBounds }) => (
              <>
                <Line
                  points={points.min}
                  color="#e0e0e0"
                  strokeWidth={1}
                  opacity={0.5}
                  animate={{ type: 'timing', duration: 300 }}
                />
                <Line
                  points={points.max}
                  color="#e0e0e0"
                  strokeWidth={1}
                  opacity={0.5}
                  animate={{ type: 'timing', duration: 300 }}
                />
                <Line
                  points={points.current_status}
                  color="#2563eb"
                  strokeWidth={3}
                  animate={{ type: 'timing', duration: 300 }}
                />
                {points.current_status.map((point, index) => {
                  const dataPoint = formattedData[index];
                  const color = dataPoint.isInRange ? '#22c55e' : '#ef4444';
                  return (
                    <Circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r={6}
                      color={color}
                    />
                  );
                })}
              </>
            )}
        </CartesianChart>
      </View>

      <View className="h-px bg-gray-300 mt-4" />
    </View>
  );
}

/* UI/UX BIAS FOR FUTURE DESIGN PASS
Minimalistic and data-focused. Simple line graphs without complex decorative elements. Accent color for current_status line draws attention to actual performance. Red/green dot color coding provides instant status feedback. Subtle min/max lines serve as reference without competing for attention. Button styling clearly indicates selected timeframe state. Overall aesthetic: clean, analytical, focused on trend identification rather than visual flair.
*/
