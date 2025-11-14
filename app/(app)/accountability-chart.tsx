import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Modal, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import Svg, { Line, Rect } from 'react-native-svg';
import { useAccount } from '../../providers/AccountProvider';
import { accountabilityChartService, AccountabilityNode, AccountabilityLine } from '../../services/accountabilityChartService';

const CANVAS_WIDTH = 3000;
const CANVAS_HEIGHT = 3000;
const NODE_WIDTH = 140;
const NODE_HEIGHT = 90;

type EditingNode = AccountabilityNode & { isNew?: boolean };

type EditingLine = {
  line: AccountabilityLine;
  centerX: number;
  centerY: number;
  length: number;
  angle: number;
};

export default function AccountabilityChartScreen() {
  const { user } = useAccount();
  const [nodes, setNodes] = useState<AccountabilityNode[]>([]);
  const [lines, setLines] = useState<AccountabilityLine[]>([]);
  const [editingNode, setEditingNode] = useState<EditingNode | null>(null);
  const [editingLine, setEditingLine] = useState<EditingLine | null>(null);
  const [showDescriptionPopup, setShowDescriptionPopup] = useState<{ node: AccountabilityNode; x: number; y: number } | null>(null);
  const [loading, setLoading] = useState(true);

  // Pan and zoom state
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // Get screen dimensions for boundary calculations
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // Load data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [nodesData, linesData] = await Promise.all([
        accountabilityChartService.getNodes(),
        accountabilityChartService.getLines(),
      ]);
      setNodes(nodesData);
      setLines(linesData);
    } catch (error) {
      console.error('Error loading accountability chart:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Canvas gestures (pan and pinch)
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((e) => {
      const newTranslateX = savedTranslateX.value + e.translationX;
      const newTranslateY = savedTranslateY.value + e.translationY;

      // Calculate boundaries to keep canvas within view
      const scaledWidth = CANVAS_WIDTH * scale.value;
      const scaledHeight = CANVAS_HEIGHT * scale.value;

      // Maximum translation is 0 (canvas at left/top edge of screen)
      // Minimum translation ensures canvas stays within screen bounds
      const maxTranslateX = 0;
      const minTranslateX = screenWidth - scaledWidth;
      const maxTranslateY = 0;
      const minTranslateY = screenHeight - scaledHeight;

      // Constrain translation within bounds
      translateX.value = Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX));
      translateY.value = Math.max(minTranslateY, Math.min(maxTranslateY, newTranslateY));
    });

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      savedScale.value = scale.value;
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((e) => {
      const newScale = Math.max(0.5, Math.min(3, savedScale.value * e.scale));

      // Calculate focal point adjustments to zoom from center of fingers
      const focalX = e.focalX;
      const focalY = e.focalY;

      // Adjust translation to keep the focal point stationary
      // Don't apply boundary constraints during zoom to allow smooth focal point behavior
      translateX.value = focalX - (focalX - savedTranslateX.value) * (newScale / savedScale.value);
      translateY.value = focalY - (focalY - savedTranslateY.value) * (newScale / savedScale.value);
      scale.value = newScale;
    })
    .onEnd(() => {
      // Apply boundary constraints after zoom completes to keep canvas in bounds
      const scaledWidth = CANVAS_WIDTH * scale.value;
      const scaledHeight = CANVAS_HEIGHT * scale.value;
      const maxTranslateX = 0;
      const minTranslateX = screenWidth - scaledWidth;
      const maxTranslateY = 0;
      const minTranslateY = screenHeight - scaledHeight;

      // Clamp translation to boundaries
      translateX.value = Math.max(minTranslateX, Math.min(maxTranslateX, translateX.value));
      translateY.value = Math.max(minTranslateY, Math.min(maxTranslateY, translateY.value));

      // Save final constrained values
      savedScale.value = scale.value;
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Add node
  const handleAddNode = async () => {
    if (!user) return;
    try {
      const screenCenter = Dimensions.get('window');
      const canvasX = (screenCenter.width / 2 - translateX.value) / scale.value;
      const canvasY = (screenCenter.height / 2 - translateY.value) / scale.value;

      const newNode = await accountabilityChartService.createNode(user.id, canvasX, canvasY);
      setNodes([...nodes, newNode]);
      setEditingNode({ ...newNode, isNew: true });
    } catch (error) {
      console.error('Error creating node:', error);
    }
  };

  // Add line
  const handleAddLine = async () => {
    if (!user) return;
    try {
      const screenCenter = Dimensions.get('window');
      const canvasX = (screenCenter.width / 2 - translateX.value) / scale.value;
      const canvasY = (screenCenter.height / 2 - translateY.value) / scale.value;

      const newLine = await accountabilityChartService.createLine(
        user.id,
        canvasX - 50,
        canvasY,
        canvasX + 50,
        canvasY
      );
      setLines([...lines, newLine]);
    } catch (error) {
      console.error('Error creating line:', error);
    }
  };

  // Update node position
  const updateNodePosition = async (nodeId: string, x: number, y: number) => {
    try {
      await accountabilityChartService.updateNode(nodeId, { x_position: x, y_position: y });
      setNodes(nodes.map(n => n.id === nodeId ? { ...n, x_position: x, y_position: y } : n));
    } catch (error) {
      console.error('Error updating node position:', error);
    }
  };

  // Update line position
  const updateLinePosition = async (
    lineId: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    try {
      await accountabilityChartService.updateLine(lineId, {
        start_x: startX,
        start_y: startY,
        end_x: endX,
        end_y: endY,
      });
      setLines(
        lines.map((l) =>
          l.id === lineId
            ? { ...l, start_x: startX, start_y: startY, end_x: endX, end_y: endY }
            : l
        )
      );
    } catch (error) {
      console.error('Error updating line position:', error);
    }
  };

  // Handle line long press (open edit modal)
  const handleLineLongPress = (line: AccountabilityLine) => {
    const centerX = (line.start_x + line.end_x) / 2;
    const centerY = (line.start_y + line.end_y) / 2;
    const length = Math.sqrt(
      Math.pow(line.end_x - line.start_x, 2) + Math.pow(line.end_y - line.start_y, 2)
    );
    const angle = Math.atan2(line.end_y - line.start_y, line.end_x - line.start_x) * (180 / Math.PI);
    setEditingLine({ line, centerX, centerY, length, angle });
  };

  // Save edited line
  const handleSaveLine = async () => {
    if (!editingLine) return;
    try {
      const angleRad = (editingLine.angle * Math.PI) / 180;
      const halfLength = editingLine.length / 2;
      const startX = editingLine.centerX - halfLength * Math.cos(angleRad);
      const startY = editingLine.centerY - halfLength * Math.sin(angleRad);
      const endX = editingLine.centerX + halfLength * Math.cos(angleRad);
      const endY = editingLine.centerY + halfLength * Math.sin(angleRad);

      await accountabilityChartService.updateLine(editingLine.line.id, {
        start_x: startX,
        start_y: startY,
        end_x: endX,
        end_y: endY,
      });
      setLines(
        lines.map((l) =>
          l.id === editingLine.line.id
            ? { ...l, start_x: startX, start_y: startY, end_x: endX, end_y: endY }
            : l
        )
      );
      setEditingLine(null);
    } catch (error) {
      console.error('Error saving line:', error);
    }
  };

  // Delete line
  const handleDeleteLine = async () => {
    if (!editingLine) return;
    try {
      await accountabilityChartService.deleteLine(editingLine.line.id);
      setLines(lines.filter((l) => l.id !== editingLine.line.id));
      setEditingLine(null);
    } catch (error) {
      console.error('Error deleting line:', error);
    }
  };

  // Save edited node
  const handleSaveNode = async () => {
    if (!editingNode || !user) return;
    try {
      await accountabilityChartService.updateNode(editingNode.id, {
        title: editingNode.title,
        names: editingNode.names,
        description: editingNode.description,
      });
      setNodes(nodes.map(n => n.id === editingNode.id ? editingNode : n));
      setEditingNode(null);
    } catch (error) {
      console.error('Error saving node:', error);
    }
  };

  // Delete node
  const handleDeleteNode = async () => {
    if (!editingNode) return;
    try {
      await accountabilityChartService.deleteNode(editingNode.id);
      setNodes(nodes.filter(n => n.id !== editingNode.id));
      setEditingNode(null);
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.canvas, animatedStyle]}>
            {/* SVG for background and lines */}
            <Svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={StyleSheet.absoluteFill}>
              {/* Background texture */}
              <Rect width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="#f5f5f5" />

              {/* Grid pattern for spatial orientation */}
              {Array.from({ length: Math.floor(CANVAS_WIDTH / 100) }).map((_, i) => (
                <Line
                  key={`v-${i}`}
                  x1={i * 100}
                  y1={0}
                  x2={i * 100}
                  y2={CANVAS_HEIGHT}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: Math.floor(CANVAS_HEIGHT / 100) }).map((_, i) => (
                <Line
                  key={`h-${i}`}
                  x1={0}
                  y1={i * 100}
                  x2={CANVAS_WIDTH}
                  y2={i * 100}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
              ))}

              {/* Lines - rendered in SVG for visual display */}
              {lines.map((line) => (
                <Line
                  key={line.id}
                  x1={line.start_x}
                  y1={line.start_y}
                  x2={line.end_x}
                  y2={line.end_y}
                  stroke="#333"
                  strokeWidth="2"
                />
              ))}
            </Svg>

            {/* Draggable Lines (invisible hit areas over SVG lines) */}
            {lines.map((line) => (
              <DraggableLine
                key={line.id}
                line={line}
                onPositionChange={updateLinePosition}
                onLongPress={handleLineLongPress}
                canvasScale={scale}
              />
            ))}

            {/* Nodes as Views */}
            {nodes.map((node) => (
              <DraggableNode
                key={node.id}
                node={node}
                onPositionChange={updateNodePosition}
                onLongPress={(screenX, screenY) => setShowDescriptionPopup({ node, x: screenX, y: screenY })}
                canvasScale={scale}
                canvasTranslateX={translateX}
                canvasTranslateY={translateY}
              />
            ))}
          </Animated.View>
        </GestureDetector>

        {/* Add Position Button */}
        <Pressable style={styles.addNodeButton} onPress={handleAddNode}>
          <Text style={styles.buttonText}>Add Position</Text>
        </Pressable>

        {/* Add Line Button */}
        <Pressable style={styles.addLineButton} onPress={handleAddLine}>
          <Text style={styles.buttonText}>Add Line</Text>
        </Pressable>

        {/* Description Popup */}
        {showDescriptionPopup && (
          <Modal transparent visible onRequestClose={() => setShowDescriptionPopup(null)}>
            <Pressable style={styles.modalOverlay} onPress={() => setShowDescriptionPopup(null)}>
              <View style={[styles.popup, { top: showDescriptionPopup.y, left: showDescriptionPopup.x }]}>
                <Text style={styles.popupTitle}>{showDescriptionPopup.node.title || 'Untitled'}</Text>
                <Text style={styles.popupDescription}>{showDescriptionPopup.node.description || 'No description'}</Text>
                <TouchableOpacity onPress={() => {
                  setEditingNode(showDescriptionPopup.node);
                  setShowDescriptionPopup(null);
                }}>
                  <Text>Edit</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        )}

        {/* Edit Node Modal */}
        {editingNode && (
          <Modal visible onRequestClose={() => setEditingNode(null)}>
            <ScrollView style={styles.editModal}>
              <Text style={styles.modalTitle}>Edit Position</Text>

              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                value={editingNode.title || ''}
                onChangeText={(text) => setEditingNode({ ...editingNode, title: text })}
                placeholder="Position title"
              />

              <Text style={styles.label}>Names</Text>
              <TextInput
                style={styles.input}
                value={editingNode.names || ''}
                onChangeText={(text) => setEditingNode({ ...editingNode, names: text })}
                placeholder="Person name(s)"
              />

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={editingNode.description || ''}
                onChangeText={(text) => setEditingNode({ ...editingNode, description: text })}
                placeholder="Role description and responsibilities"
                multiline
                numberOfLines={4}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setEditingNode(null)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveNode}>
                  <Text>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteNode}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
        )}

        {/* Edit Line Modal */}
        {editingLine && (
          <Modal visible onRequestClose={() => setEditingLine(null)}>
            <ScrollView style={styles.editModal}>
              <Text style={styles.modalTitle}>Edit Line</Text>

              <Text style={styles.label}>Length: {Math.round(editingLine.length)}</Text>
              <View style={styles.sliderContainer}>
                <TouchableOpacity
                  onPress={() =>
                    setEditingLine({ ...editingLine, length: Math.max(20, editingLine.length - 10) })
                  }
                  style={styles.adjustButton}>
                  <Text style={styles.adjustButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setEditingLine({ ...editingLine, length: editingLine.length + 10 })}
                  style={styles.adjustButton}>
                  <Text style={styles.adjustButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Rotation: {Math.round(editingLine.angle)}°</Text>
              <View style={styles.sliderContainer}>
                <TouchableOpacity
                  onPress={() =>
                    setEditingLine({
                      ...editingLine,
                      angle: (editingLine.angle - 15 + 360) % 360,
                    })
                  }
                  style={styles.adjustButton}>
                  <Text style={styles.adjustButtonText}>↶</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setEditingLine({
                      ...editingLine,
                      angle: (editingLine.angle + 15) % 360,
                    })
                  }
                  style={styles.adjustButton}>
                  <Text style={styles.adjustButtonText}>↷</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setEditingLine(null)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveLine}>
                  <Text>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteLine}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

// Draggable Line Component
type DraggableLineProps = {
  line: AccountabilityLine;
  onPositionChange: (
    id: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => void;
  onLongPress: (line: AccountabilityLine) => void;
  canvasScale: Animated.SharedValue<number>;
};

function DraggableLine({ line, onPositionChange, onLongPress, canvasScale }: DraggableLineProps) {
  const startX = useSharedValue(line.start_x);
  const startY = useSharedValue(line.start_y);
  const endX = useSharedValue(line.end_x);
  const endY = useSharedValue(line.end_y);
  const savedStartX = useSharedValue(line.start_x);
  const savedStartY = useSharedValue(line.start_y);
  const savedEndX = useSharedValue(line.end_x);
  const savedEndY = useSharedValue(line.end_y);

  useEffect(() => {
    startX.value = line.start_x;
    startY.value = line.start_y;
    endX.value = line.end_x;
    endY.value = line.end_y;
  }, [line.start_x, line.start_y, line.end_x, line.end_y]);

  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      savedStartX.value = startX.value;
      savedStartY.value = startY.value;
      savedEndX.value = endX.value;
      savedEndY.value = endY.value;
    })
    .onUpdate((e) => {
      const deltaX = e.translationX / canvasScale.value;
      const deltaY = e.translationY / canvasScale.value;
      startX.value = savedStartX.value + deltaX;
      startY.value = savedStartY.value + deltaY;
      endX.value = savedEndX.value + deltaX;
      endY.value = savedEndY.value + deltaY;
    })
    .onEnd(() => {
      runOnJS(onPositionChange)(line.id, startX.value, startY.value, endX.value, endY.value);
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      runOnJS(onLongPress)(line);
    });

  const composedLineGesture = Gesture.Race(longPressGesture, dragGesture);

  // Calculate line center and rotation for hit area
  const centerX = (line.start_x + line.end_x) / 2;
  const centerY = (line.start_y + line.end_y) / 2;
  const length = Math.sqrt(
    Math.pow(line.end_x - line.start_x, 2) + Math.pow(line.end_y - line.start_y, 2)
  );
  const angle = Math.atan2(line.end_y - line.start_y, line.end_x - line.start_x) * (180 / Math.PI);

  const animatedLineStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: (startX.value + endX.value) / 2 },
      { translateY: (startY.value + endY.value) / 2 },
    ],
  }));

  return (
    <GestureDetector gesture={composedLineGesture}>
      <Animated.View
        style={[
          styles.lineHitArea,
          {
            width: length,
            left: centerX - length / 2,
            top: centerY - 10,
            transform: [{ rotate: `${angle}deg` }],
          },
          animatedLineStyle,
        ]}
      />
    </GestureDetector>
  );
}

// Draggable Node Component
type DraggableNodeProps = {
  node: AccountabilityNode;
  onPositionChange: (id: string, x: number, y: number) => void;
  onLongPress: (x: number, y: number) => void;
  canvasScale: Animated.SharedValue<number>;
  canvasTranslateX: Animated.SharedValue<number>;
  canvasTranslateY: Animated.SharedValue<number>;
};

function DraggableNode({ node, onPositionChange, onLongPress, canvasScale, canvasTranslateX, canvasTranslateY }: DraggableNodeProps) {
  const offsetX = useSharedValue(node.x_position);
  const offsetY = useSharedValue(node.y_position);
  const startX = useSharedValue(node.x_position);
  const startY = useSharedValue(node.y_position);

  useEffect(() => {
    offsetX.value = node.x_position;
    offsetY.value = node.y_position;
  }, [node.x_position, node.y_position]);

  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = offsetX.value;
      startY.value = offsetY.value;
    })
    .onUpdate((e) => {
      offsetX.value = startX.value + e.translationX / canvasScale.value;
      offsetY.value = startY.value + e.translationY / canvasScale.value;
    })
    .onEnd(() => {
      // Use runOnJS to safely call the async function from worklet context
      runOnJS(onPositionChange)(node.id, offsetX.value, offsetY.value);
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onStart((e) => {
      // Use runOnJS to safely call the callback from worklet context
      runOnJS(onLongPress)(e.absoluteX, e.absoluteY);
    });

  const composedNodeGesture = Gesture.Race(longPressGesture, dragGesture);

  const animatedNodeStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
  }));

  return (
    <GestureDetector gesture={composedNodeGesture}>
      <Animated.View style={[styles.node, animatedNodeStyle]}>
        <Text style={styles.nodeTitle} numberOfLines={2}>
          {node.title || 'Untitled'}
        </Text>
        <Text style={styles.nodeNames} numberOfLines={1}>
          {node.names || ''}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  canvas: {
    flex: 1,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
  node: {
    position: 'absolute',
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  nodeNames: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  addNodeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
  },
  addLineButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popup: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    maxWidth: 300,
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  popupDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  editModal: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    gap: 12,
  },
  lineHitArea: {
    position: 'absolute',
    height: 20,
    backgroundColor: 'transparent',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 8,
    marginBottom: 16,
  },
  adjustButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  adjustButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

/*
 * ============================================
 * GLOBAL UI DESIGN BIAS - FOR STYLING AGENT
 * ============================================
 *
 * [ ]: presentational - visually rich with fancy fonts, large graphics, and generous whitespace.
 * [x]: business management - function first, graphs are less visual, more numeric. display is more plain, but more clear.
 * [ ]: shop - conversion first = clear checkout flow, smooth transitions, bold CTA's, high contrast palate.
 * [x]: custom: emphasis on well defined sections, very distinctively separated. this is because of the amount of business information that needs to be easily scrolled through.
 *
 * This information guides future styling passes.
 * Do not modify the functional code above based on this bias yet.
 * ============================================
 */
