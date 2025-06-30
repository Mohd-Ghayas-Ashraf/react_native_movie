import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Org } from '../types/types';

interface Props {
  org: Org;
  level?: number;
  onSelect?: (id: number) => void; // ✅ add this
}

const TreeNode: React.FC<Props> = ({ org, level = 0, onSelect }) => {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => {
    setExpanded(!expanded);
    onSelect?.(org.id); // ✅ notify parent
  };

  return (
    <View style={{ marginLeft: level * 20, marginBottom: 8 }}>
      <TouchableOpacity  onPress={handlePress}>
        <Text style={styles.nodeTitle}>
          {expanded ? '▼' : '▶'} {org.name}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.nodeContent}>

          {/* Recursively render children */}
          {org.related_orgs?.map((child) => (
            <TreeNode key={child.id} org={child} level={level + 1} onSelect={onSelect} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nodeTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
  },
  nodeContent: {
    marginTop: 4,
  },
  itemText: {
    fontSize: 14,
    marginVertical: 2,
  },
  pairRow: {
    marginLeft: 12,
  },
});

export default TreeNode;
