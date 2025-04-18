import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

const RowLayoutScreen = () => {
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
      flexDirection: 'row',
      justifyContent: orientation === 'portrait' ? 'space-around' : 'space-evenly',
      alignItems: 'center',
      padding: orientation === 'portrait' ? 10 : 20,
    },
    square: {
      width: orientation === 'portrait' ? 80 : 100,
      height: orientation === 'portrait' ? 80 : 100,
      borderRadius: orientation === 'portrait' ? 8 : 12,
    },
    label: {
      position: 'absolute',
      color: 'white',
      fontWeight: 'bold',
      fontSize: orientation === 'portrait' ? 14 : 16,
    }
  });

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.redSquare, dynamicStyles.square]}>
        <Text style={dynamicStyles.label}>1</Text>
      </View>
      <View style={[styles.greenSquare, dynamicStyles.square]}>
        <Text style={dynamicStyles.label}>2</Text>
      </View>
      <View style={[styles.blueSquare, dynamicStyles.square]}>
        <Text style={dynamicStyles.label}>3</Text>
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

export default RowLayoutScreen;