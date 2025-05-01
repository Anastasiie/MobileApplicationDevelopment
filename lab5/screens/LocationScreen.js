import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Дозвіл на доступ до місцезнаходження відхилено');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location ? (
        Platform.OS === 'web' ? (
          <Text>
            Геолокація: {location.latitude}, {location.longitude} (карта недоступна у веб)
          </Text>
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              title="Ви тут"
            />
          </MapView>
        )
      ) : (
        <Text>Завантаження місцезнаходження...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  map: { width: '100%', height: 300 }
});
