import React from 'react';
import {View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {LEADS} from '../data/leads';
import useLocation from '../hooks/useLocation';
import {distanceMeters} from '../utils/distance';

export default function MapScreen() {
  const user = useLocation();
  const nearest = React.useMemo(() => {
    if (!user) return null;
    let best = null as null | {id: string; d: number};
    for (const l of LEADS) {
      const d = distanceMeters(user, {
        lat: l.location.lat,
        lng: l.location.lng,
      });
      if (!best || d < best.d) best = {id: l.id, d};
    }
    return best ? LEADS.find(l => l.id === best!.id)! : null;
  }, [user]);

  if (!user)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Locating… (updates every 2–6 min)</Text>
      </View>
    );

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: user.lat,
          longitude: user.lng,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}>
        <Marker
          coordinate={{latitude: user.lat, longitude: user.lng}}
          title="You"
        />
        {LEADS.map(l => (
          <Marker
            key={l.id}
            coordinate={{latitude: l.location.lat, longitude: l.location.lng}}
            title={l.name}
            description={`Score ${l.matchScore}`}
            pinColor={nearest?.id === l.id ? 'green' : undefined}
          />
        ))}
      </MapView>
      {nearest && (
        <View
          style={{
            position: 'absolute',
            left: 10,
            right: 10,
            bottom: 10,
            backgroundColor: '#fff',
            padding: 12,
            borderRadius: 12,
          }}>
          <Text style={{fontWeight: '700'}}>Nearest Lead: {nearest.name}</Text>
          <Text>Location: {nearest.location.address}</Text>
        </View>
      )}
    </View>
  );
}
