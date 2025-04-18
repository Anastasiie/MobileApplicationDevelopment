import React from 'react';
import { View, StyleSheet } from 'react-native';
import LayoutSwitcher from './components/LayoutSwitcher';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LayoutSwitcher />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
