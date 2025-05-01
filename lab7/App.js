import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Pressable, RefreshControl, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

// Screen 1: Touch Feedback
function TouchFeedbackScreen() {
  const [pressText, setPressText] = useState('Pressable');

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        activeOpacity={0.6}
        onPress={() => Alert.alert('Opacity Button Pressed!')}
      >
        <Text style={styles.buttonText}>Opacity</Text>
      </TouchableOpacity>

      <TouchableHighlight
        style={styles.button}
        underlayColor="#26A69A" // Більш яскравий м'ятний колір при натисканні
        onPress={() => Alert.alert('Highlight Button Pressed!')}
      >
        <Text style={styles.buttonText}>Highlight</Text>
      </TouchableHighlight>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { 
            backgroundColor: pressed ? '#26A69A' : '#66BB6A',
            transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }]
          }
        ]}
        onPressIn={() => setPressText('Pressed')}
        onPressOut={() => setPressText('Pressable')}
        onLongPress={() => setPressText('Long Pressed')}
      >
        <Text style={styles.buttonText}>{pressText}</Text>
      </Pressable>
    </View>
  );
}

// Screen 2: Scroll View
function ScrollExampleScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {[...Array(12)].map((_, i) => (
        <View key={i} style={styles.scrollItem}>
          <Text style={styles.scrollText}>Item {i + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// Swipeable item component
function SwipeableItem({ text, onSwipe }) {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const width = Dimensions.get('window').width;
    if (offsetX > width / 2 && !scrolled) {
      setScrolled(true);
      onSwipe();
    }
  };

  return (
    <ScrollView
      horizontal
      pagingEnabled
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.swipeItem}><Text style={styles.buttonText}>{text}</Text></View>
      <View style={styles.swipeEmpty}></View>
    </ScrollView>
  );
}

// Screen 3: Swipe List
function SwipeListScreen() {
  const [items, setItems] = useState([...Array(6)].map((_, i) => `Swipe Me ${i + 1}`));

  const handleSwipe = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <View style={styles.container}>
      {items.map((item, i) => (
        <SwipeableItem key={i} text={item} onSwipe={() => handleSwipe(i)} />
      ))}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Touch Feedback" component={TouchFeedbackScreen} />
        <Tab.Screen name="Scroll View" component={ScrollExampleScreen} />
        <Tab.Screen name="Swipe List" component={SwipeListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#66BB6A', // М'ятний колір
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3, // Тінь для Android
    shadowColor: '#000', // Тінь для iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
  },
  scrollItem: {
    height: 50,
    backgroundColor: '#A5D6A7',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  scrollText: {
    fontSize: 16,
    color: '#1B5E20',
    fontWeight: '500',
  },
  swipeItem: {
    width: Dimensions.get('window').width,
    backgroundColor: '#66BB6A',
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  swipeEmpty: {
    width: Dimensions.get('window').width,
  },
});