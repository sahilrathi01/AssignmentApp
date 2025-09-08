import React from 'react';
import {View, FlatList} from 'react-native';
import {getDeclined} from '../store/storage';
import LeadCard from '../components/LeadCard';
import {Lead} from '../types';

export default function DeclinedLeadsScreen() {
  const [list, setList] = React.useState<Lead[]>([]);
  React.useEffect(() => {
    (async () => setList(await getDeclined()))();
  }, []);
  return (
    <View style={{flex: 1, padding: 16}}>
      <FlatList
        data={list}
        keyExtractor={i => i.id}
        renderItem={({item}) => <LeadCard lead={item} />}
      />
    </View>
  );
}
