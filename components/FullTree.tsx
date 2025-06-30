import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Org } from '../types/types';

interface Props {
  org: Org;
  level?: number;
}

const FullTree: React.FC<Props> = ({ org, level = 0 }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{ marginLeft: level * 20, marginBottom: 8 }}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.nodeTitle}>
          {expanded ? '▼' : '▶'} {org.name}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.nodeContent}>
          {/* List Position - Employee pairs */}
          {org.positions?.map((position) => (
            <View key={position.id} style={styles.pairRow}>
              <Text style={styles.itemText}>
                {position.name}
                {position.related_employees?.[0] ? (
                  <> - {position.related_employees[0].name}</>
                ) : (
                  ' - (Vacant)'
                )}
              </Text>
            </View>
          ))}

          {/* Recursively render children */}
          {org.related_orgs?.map((child) => (
            <FullTree key={child.id} org={child} level={level + 1} />
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

export default FullTree;
