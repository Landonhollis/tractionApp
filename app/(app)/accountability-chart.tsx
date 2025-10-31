import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Modal, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Svg, { Line, Rect } from 'react-native-svg';
import { useAccount } from '../../providers/AccountProvider';
import { accountabilityChartService, AccountabilityNode, AccountabilityLine } from '../../services/accountabilityChartService';

const CANVAS_WIDTH = 3000;
const CANVAS_HEIGHT = 3000;
const NODE_WIDTH = 140;
const NODE_HEIGHT = 90;

type EditingNode = AccountabilityNode & { isNew?: boolean };

export default function AccountabilityChartScreen() {
  const { user } = useAccount();
  const [nodes, setNodes] = useState<AccountabilityNode[]>([]);
  const [lines, setLines] = useState<AccountabilityLine[]>([]);
  const [editingNode, setEditingNode] = useState<EditingNode | null>(null);
  const [showDescriptionPopup, setShowDescriptionPopup] = useState<{ node: AccountabilityNode; x: number; y: number } | null>(null);
  const [loading, setLoading] = useState(true);

  // Pan and zoom state
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // Load data
  const loadData = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const [nodesData, linesData] = await Promise.all([
        accountabilityChartService.getNodes(user.id),
        accountabilityChartService.getLines(user.id),
      ]);
      setNodes(nodesData);
      setLines(linesData);
    } catch (error) {
      console.error('Error loading accountability chart:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

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
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.max(0.5, Math.min(3, savedScale.value * e.scale));
    })
    .onEnd(() => {
      savedScale.value = scale.value;
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

              {/* Lines */}
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

        {/* Edit Modal */}
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
      </View>
    </GestureHandlerRootView>
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
      onPositionChange(node.id, offsetX.value, offsetY.value);
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onStart((e) => {
      onLongPress(e.absoluteX, e.absoluteY);
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
});

/* UI/UX BIAS FOR FUTURE DESIGN PASS
Minimalistic and professional. Rounded boxes for nodes with clean typography. Subtle texture on canvas background for spatial orientation without distraction. Green accent for add buttons suggests growth and addition. Popups should feel lightweight and non-intrusive. Overall aesthetic should support focus on organizational structure rather than decorative elements.
*/
