import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Lead} from '../types';

export default function LeadCard({
  lead,
  highlight,
}: {
  lead: Lead;
  highlight?: boolean;
}) {
  return (
    <View style={[styles.card, highlight && styles.highlight]}>
      <Text style={styles.name}>{lead.name}</Text>
      <Text>
        {lead.location.address ||
          `${lead.location.lat.toFixed(3)}, ${lead.location.lng.toFixed(3)}`}
      </Text>
      <Text>
        Match Score: <Text style={{fontWeight: 'bold'}}>{lead.matchScore}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginVertical: 6,
    elevation: 2,
  },
  highlight: {borderWidth: 2, borderColor: '#4caf50'},
  name: {fontSize: 16, fontWeight: '600', marginBottom: 4},
});
