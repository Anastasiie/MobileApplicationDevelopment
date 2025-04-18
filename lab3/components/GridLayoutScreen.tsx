import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const colors = [
  'red', 'green', 'blue', 'yellow', 
  'purple', 'orange', 'pink', 'cyan',
  'brown', 'gray', 'magenta', 'lime'
];

const GridLayoutScreen = () => {
  // Розраховуємо ширину екрану
  const screenWidth = Dimensions.get('window').width;
  // Визначаємо кількість колонок в залежності від орієнтації
  const columns = screenWidth > 500 ? 4 : 3;
  // Розраховуємо розмір квадрата
  const squareSize = (screenWidth - 20) / columns - 20;

  return (
    <View style={styles.container}>
      {colors.map((color, index) => (
        <View 
          key={index}
          style={[
            styles.square, 
            { 
              backgroundColor: color,
              width: squareSize,
              height: squareSize,
            }
          ]} 
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  square: {
    margin: 10,
  },
});

export default GridLayoutScreen;