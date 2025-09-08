import React from 'react';
import {View, Text, FlatList, Button, Switch} from 'react-native';
import {LEADS} from '../data/leads';
import {Lead} from '../types';
import useLocation from '../hooks/useLocation';
import {distanceMeters, metersToKm} from '../utils/distance';
import LeadCard from '../components/LeadCard';

export default function DashboardScreen() {
  const user = useLocation();
  const [sortBy, setSortBy] = React.useState<'distance' | 'score'>('distance');
  const [only70, setOnly70] = React.useState<boolean>(false);

  const computed = React.useMemo(() => {
    const arr = LEADS.map(l => ({
      ...l,
      distance: user
        ? distanceMeters(user, {lat: l.location.lat, lng: l.location.lng})
        : null,
    }));
    let out = arr as Array<Lead & {distance: number | null}>;
    if (only70) out = out.filter(l => l.matchScore > 70);
    out.sort((a, b) => {
      if (sortBy === 'score') return b.matchScore - a.matchScore;
      const da = a.distance ?? Number.POSITIVE_INFINITY;
      const db = b.distance ?? Number.POSITIVE_INFINITY;
      return da - db;
    });
    return out;
  }, [user, sortBy, only70]);

  const best = computed[0];

  return (
    <View style={{flex: 1, padding: 16}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
        <View style={{flexDirection: 'row', gap: 8}}>
          <Button
            title="Sort: Distance"
            onPress={() => setSortBy('distance')}
          />
          <Button title="Sort: Score" onPress={() => setSortBy('score')} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Text>Score 70%</Text>
          <Switch value={only70} onValueChange={setOnly70} />
        </View>
      </View>

      {best && (
        <View
          style={{
            padding: 12,
            backgroundColor: '#e8f5e9',
            borderRadius: 12,
            marginBottom: 12,
          }}>
          <Text style={{fontWeight: '700'}}>Best Match: {best.name}</Text>
          <Text>Score: {best.matchScore}</Text>
          <Text>
            Distance: {best.distance ? metersToKm(best.distance) + ' km' : '—'}
          </Text>
        </View>
      )}

      <FlatList
        data={computed}
        keyExtractor={i => i.id}
        renderItem={({item}) => (
          <View>
            <LeadCard lead={item} highlight={item.id === best?.id} />
            <Text style={{marginLeft: 8, marginBottom: 10}}>
              Distance:{' '}
              {item.distance ? metersToKm(item.distance) + ' km' : '—'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
