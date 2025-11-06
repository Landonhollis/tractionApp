import { supabase } from './supabaseClient';

export type DataHistoryRecord = {
  id: string;
  user_id: string;
  metric_id: string;
  current_status: number;
  min: number;
  max: number;
  timestamp: string;
  created_at: string;
};

export type MetricWithHistory = {
  metric_id: string;
  metric_description: string;
  history: DataHistoryRecord[];
};

type TimeframeFilter = 'all' | '6mo' | '1mo';

export const dataHistoryService = {
  async fetchAllHistoryGroupedByMetric(): Promise<MetricWithHistory[]> {
    const { data: historyData, error: historyError } = await supabase
      .from('data_history')
      .select('*')
      .order('timestamp', { ascending: true });

    if (historyError) throw historyError;
    if (!historyData || historyData.length === 0) return [];

    const uniqueMetricIds = [...new Set(historyData.map((record) => record.metric_id))];

    const { data: metricsData, error: metricsError } = await supabase
      .from('metrics')
      .select('id, description')
      .in('id', uniqueMetricIds);

    if (metricsError) throw metricsError;

    const metricsMap = new Map(
      metricsData?.map((metric) => [metric.id, metric.description]) || []
    );

    const groupedByMetric: { [key: string]: DataHistoryRecord[] } = {};

    historyData.forEach((record) => {
      if (!groupedByMetric[record.metric_id]) {
        groupedByMetric[record.metric_id] = [];
      }
      groupedByMetric[record.metric_id].push(record);
    });

    return Object.keys(groupedByMetric).map((metricId) => ({
      metric_id: metricId,
      metric_description: metricsMap.get(metricId) || 'Unknown Metric',
      history: groupedByMetric[metricId],
    }));
  },

  filterByTimeframe(records: DataHistoryRecord[], timeframe: TimeframeFilter): DataHistoryRecord[] {
    if (timeframe === 'all') return records;

    const now = new Date();
    const cutoffDate = new Date();

    if (timeframe === '6mo') {
      cutoffDate.setMonth(now.getMonth() - 6);
    } else if (timeframe === '1mo') {
      cutoffDate.setMonth(now.getMonth() - 1);
    }

    return records.filter((record) => new Date(record.timestamp) >= cutoffDate);
  },

  async createHistorySnapshot(
    userId: string,
    metricId: string,
    currentStatus: number,
    min: number,
    max: number
  ): Promise<void> {
    const { error } = await supabase.from('data_history').insert({
      user_id: userId,
      metric_id: metricId,
      current_status: currentStatus,
      min: min,
      max: max,
      timestamp: new Date().toISOString(),
    });

    if (error) throw error;
  },
};
