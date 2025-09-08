import React from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {LEADS} from '../data/leads';
import {saveDeclined} from '../store/storage';

export default function NotificationScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Notify'>) {
  // Simulate receiving a push by picking a random lead
  const lead = React.useMemo(
    () => LEADS[Math.floor(Math.random() * LEADS.length)],
    [],
  );

  const accept = () => navigation.replace('LeadDetails', {leadId: lead.id});
  const reject = async () => {
    await saveDeclined(lead);
    Alert.alert('Saved to Declined');
  };

  return (
    <View style={{flex: 1, padding: 24, backgroundColor: '#111'}}>
      <View style={{flex: 1, justifyContent: 'center', gap: 12}}>
        <Text style={{color: '#fff', fontSize: 24, fontWeight: '700'}}>
          Incoming Lead
        </Text>
        <Text style={{color: '#fff', fontSize: 18}}>{lead.name}</Text>
        <Text style={{color: '#fff'}}>Location: {lead.location.address}</Text>
        <Text style={{color: '#fff'}}>Match Score: {lead.matchScore}</Text>
        <View style={{height: 12}} />
        <Button title="Accept" onPress={accept} />
        <View style={{height: 8}} />
        <Button title="Reject" color="#b00020" onPress={reject} />
      </View>
    </View>
  );
}
