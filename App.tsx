import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import OCRScreen from './src/screens/OCRScreen';
import ChatScreen from './src/screens/ChatScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import LeadDetailsScreen from './src/screens/LeadDetailsScreen';
import DeclinedLeadsScreen from './src/screens/DeclinedLeadsScreen';
import MapScreen from './src/screens/MapScreen';
import DashboardScreen from './src/screens/DashboardScreen';

export type RootStackParamList = {
  Home: undefined;
  OCR: undefined;
  Chat: undefined;
  Notify: { leadId?: string } | undefined;
  LeadDetails: { leadId: string };
  Declined: undefined;
  Map: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="OCR"
          component={OCRScreen}
          options={{ title: 'OCR Capture' }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ title: 'AI Lead Chat' }}
        />
        <Stack.Screen
          name="Notify"
          component={NotificationScreen}
          options={{ title: 'Incoming Lead' }}
        />
        <Stack.Screen
          name="LeadDetails"
          component={LeadDetailsScreen}
          options={{ title: 'Lead Details' }}
        />
        <Stack.Screen
          name="Declined"
          component={DeclinedLeadsScreen}
          options={{ title: 'Declined Leads' }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: 'Map & Nearest Lead' }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Lead Dashboard' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
