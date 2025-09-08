import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export type LatLng = {lat: number; lng: number};

export default function useLocation() {
  const [pos, setPos] = useState<LatLng | null>(null);
  const appState = useRef(AppState.currentState);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const request = () =>
      Geolocation.getCurrentPosition(
        info => setPos({lat: info.coords.latitude, lng: info.coords.longitude}),
        () => {},
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 60000},
      );

    const startPolling = (intervalMs: number) => {
      if (timer.current) clearInterval(timer.current);
      request();
      timer.current = setInterval(request, intervalMs);
    };

    // Active: every 2 minutes; Inactive: every 6 minutes
    startPolling(120000);

    const sub = AppState.addEventListener('change', state => {
      appState.current = state;
      if (state === 'active') startPolling(120000);
      else startPolling(360000);
    });

    return () => {
      if (timer.current) clearInterval(timer.current);
      sub.remove();
    };
  }, []);

  return pos;
}
