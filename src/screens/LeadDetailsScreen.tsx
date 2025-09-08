import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {LEADS} from '../data/leads';

export default function LeadDetailsScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'LeadDetails'>) {
  const lead = LEADS.find(l => l.id === route.params.leadId)!;
  return (
    <View style={{flex: 1, padding: 16}}>
      <Text style={{fontSize: 22, fontWeight: '700'}}>{lead.name}</Text>
      <Text>Location: {lead.location.address}</Text>
      <Text>
        Lat/Lng: {lead.location.lat}, {lead.location.lng}
      </Text>
      <Text>Match Score: {lead.matchScore}</Text>
    </View>
  );
}
