import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const initialTeas = [
  { id: '1', name: 'Green Tea', price: 50 },
  { id: '2', name: 'Black Tea', price: 40 },
  { id: '3', name: 'Oolong', price: 60 },
  { id: '4', name: 'Pu-erh', price: 70 },
  { id: '5', name: 'White Tea', price: 55 },
  { id: '6', name: 'Yellow Tea', price: 65 },
  { id: '7', name: 'Matcha', price: 80 },
  { id: '8', name: 'Herbal Tea', price: 45 },
  { id: '9', name: 'Rooibos', price: 50 },
  { id: '10', name: 'Roselle Tea', price: 35 },
];

export default function TeaListScreen() {
  const [teas, setTeas] = useState(initialTeas);
  const [search, setSearch] = useState('');
  const [ascending, setAscending] = useState(true);

  const handleDelete = (id) => {
    setTeas(teas.filter(tea => tea.id !== id));
  };

  const filteredTeas = teas
    .filter(tea => tea.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => ascending ? a.price - b.price : b.price - a.price);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Пошук..."
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />
      <Button
        title={`Сортувати за ціною (${ascending ? '↑' : '↓'})`}
        onPress={() => setAscending(!ascending)}
      />

      {filteredTeas.length === 0 ? (
        <Text style={styles.empty}>Чаїв не знайдено</Text>
      ) : (
        <FlatList
          data={filteredTeas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name} – {item.price} грн</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Видалити</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
  item: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 10, borderBottomWidth: 1
  },
  delete: { color: 'red' },
  empty: { marginTop: 20, fontStyle: 'italic' }
});
