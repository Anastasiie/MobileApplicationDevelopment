import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

const ColumnLayoutScreen = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
  );

  // Функція для визначення поточної орієнтації
  const determineOrientation = () => {
    const { width, height } = Dimensions.get('window');
    return width > height ? 'landscape' : 'portrait';
  };

  // Ефект для підписки на зміни розмірів екрану
  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(determineOrientation());
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    
    return () => {
      subscription.remove();
    };
  }, []);

  // Стилі, що залежать від орієнтації
  const dynamicStyles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: orientation === 'portrait' ? 'space-around' : 'space-evenly',
      alignItems: 'center',
      padding: orientation === 'portrait' ? 20 : 40,
    },
    square: {
      width: orientation === 'portrait' ? 120 : 150,
      height: orientation === 'portrait' ? 80 : 100,
      borderRadius: orientation === 'portrait' ? 8 : 12,
      marginVertical: orientation === 'portrait' ? 10 : 15,
    },
    label: {
      position: 'absolute',
      color: 'white',
      fontWeight: 'bold',
      fontSize: orientation === 'portrait' ? 16 : 18,
    },
    orientationText: {
      position: 'absolute',
      top: 20,
      right: 20,
      fontSize: 14,
      color: '#666',
    }
  });

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={dynamicStyles.orientationText}>
        {orientation.toUpperCase()} MODE
      </Text>
      
      <View style={[styles.redSquare, dynamicStyles.square]}>
        <Text style={dynamicStyles.label}>TOP</Text>
      </View>
      <View style={[styles.greenSquare, dynamicStyles.square]}>
        <Text style={dynamicStyles.label}>MIDDLE</Text>
      </View>
      <View style={[styles.blueSquare, dynamicStyles.square]}>
        <Text style={dynamicStyles.label}>BOTTOM</Text>
      </View>
    </View>
  );
};

// Базові стилі, що не залежать від орієнтації
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  redSquare: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenSquare: {
    backgroundColor: 'rgba(0, 255, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueSquare: {
    backgroundColor: 'rgba(0, 0, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ColumnLayoutScreen;