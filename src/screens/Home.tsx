import React from 'react';
import {View, Button, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

export default function Home({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <ScrollView contentContainerStyle={{gap: 12, padding: 16}}>
      <Button
        title="Task 1: OCR Capture"
        onPress={() => navigation.navigate('OCR')}
      />
      <Button
        title="Task 2: AI Chat"
        onPress={() => navigation.navigate('Chat')}
      />
      <Button
        title="Task 3: Full-screen Notification (simulate)"
        onPress={() => navigation.navigate('Notify')}
      />
      <Button
        title="Task 4: Map + Nearest Lead"
        onPress={() => navigation.navigate('Map')}
      />
      <Button
        title="Task 5: Lead Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
      />
      <Button
        title="Declined Leads"
        onPress={() => navigation.navigate('Declined')}
      />
    </ScrollView>
  );
}
