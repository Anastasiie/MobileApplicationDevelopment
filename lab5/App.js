import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeaListScreen from './components/ItemList';
import LocationScreen from './screens/LocationScreen';
import UserInputScreen from './screens/UserInputScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="TeaList"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'TeaList') {
              iconName = 'leaf';
            } else if (route.name === 'Location') {
              iconName = 'location';
            } else if (route.name === 'UserInput') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="TeaList" component={TeaListScreen} options={{ title: 'Чаї' }} />
        <Tab.Screen name="Location" component={LocationScreen} options={{ title: 'Геолокація' }} />
        <Tab.Screen name="UserInput" component={UserInputScreen} options={{ title: 'Форма' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
