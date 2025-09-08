import React, {useState} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native';
import {fetchLeadsForQuery} from '../services/mockApi';
import {Lead} from '../types';
import LeadCard from '../components/LeadCard';

export default function ChatScreen() {
  const [query, setQuery] = useState('Show me nearby leads');
  const [messages, setMessages] = useState<
    Array<{role: 'user' | 'ai'; text: string; leads?: Lead[]}>
  >([]);

  const send = async () => {
    const q = query.trim();
    if (!q) return;
    setMessages(m => [...m, {role: 'user', text: q}]);
    const leads = await fetchLeadsForQuery(q);
    // Highlight >80 in UI
    setMessages(m => [...m, {role: 'ai', text: 'Here are your leads:', leads}]);
  };

  return (
    <View style={{flex: 1, padding: 16, gap: 12}}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => String(i)}
        renderItem={({item}) => (
          <View style={{marginVertical: 8}}>
            <Text style={{fontWeight: '600'}}>
              {item.role === 'user' ? 'You' : 'AI'}
            </Text>
            <Text>{item.text}</Text>
            {item.leads?.map(l => (
              <LeadCard key={l.id} lead={l} highlight={l.matchScore > 80} />
            ))}
          </View>
        )}
      />
      <View style={{flexDirection: 'row', gap: 8}}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          style={{flex: 1, borderWidth: 1, borderRadius: 8, padding: 8}}
        />
        <Button title="Send" onPress={send} />
      </View>
    </View>
  );
}
