import React, { useState } from 'react';
import { View, TextInput, Text, Switch, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function UserInputScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleAirplane = (value) => {
    setAirplaneMode(value);
    if (value) setWifi(false);
  };

  const toggleWifi = (value) => {
    setWifi(value);
    if (value) setAirplaneMode(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Ім’я користувача"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Надіслати" onPress={() => {
        Alert.alert('Дані', `Ім'я: ${username}\nПароль: ${password}`);
      }} />

      <View style={styles.switchRow}>
        <Text>Режим польоту</Text>
        <Switch value={airplaneMode} onValueChange={toggleAirplane} />
      </View>
      <View style={styles.switchRow}>
        <Text>Wi-Fi</Text>
        <Switch value={wifi} onValueChange={toggleWifi} />
      </View>

      <View style={styles.dateBlock}>
        <Button title="Оберіть дату" onPress={() => setShowPicker(true)} />
        <Text>Обрана дата: {date.toLocaleDateString()}</Text>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(e, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5
  },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginVertical: 10
  },
  dateBlock: {
    marginTop: 20,
  },
});