import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  SafeAreaView,
  useWindowDimensions 
} from 'react-native';
import RowLayoutScreen from './RowLayoutScreen';
import ColumnLayoutScreen from './ColumnLayoutScreen';
import GridLayoutScreen from './GridLayoutScreen';

const LayoutSwitcher = () => {
  const [layout, setLayout] = useState<'row' | 'column' | 'grid'>('row');
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;

  // Визначаємо розміри кнопок в залежності від орієнтації
  const buttonSize = isPortrait ? width / 3 - 20 : height / 3 - 20;

  return (
    <SafeAreaView style={styles.container}>
      {/* Основний вміст */}
      <View style={styles.content}>
        {layout === 'row' && <RowLayoutScreen />}
        {layout === 'column' && <ColumnLayoutScreen />}
        {layout === 'grid' && <GridLayoutScreen />}
      </View>

      {/* Панель кнопок внизу */}
      <View style={[
        styles.buttonContainer,
        { height: isPortrait ? 70 : 60 }
      ]}>
        <TouchableOpacity
          style={[
            styles.button,
            layout === 'row' && styles.activeButton,
            { width: buttonSize }
          ]}
          onPress={() => setLayout('row')}
        >
          <Text style={[
            styles.buttonText,
            layout === 'row' && styles.activeButtonText
          ]}>
            Row
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            layout === 'column' && styles.activeButton,
            { width: buttonSize }
          ]}
          onPress={() => setLayout('column')}
        >
          <Text style={[
            styles.buttonText,
            layout === 'column' && styles.activeButtonText
          ]}>
            Column
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            layout === 'grid' && styles.activeButton,
            { width: buttonSize }
          ]}
          onPress={() => setLayout('grid')}
        >
          <Text style={[
            styles.buttonText,
            layout === 'grid' && styles.activeButtonText
          ]}>
            Grid
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#6200EE',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  activeButtonText: {
    color: '#fff',
  },
});

export default LayoutSwitcher;