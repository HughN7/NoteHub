import * as React from 'react';
import { useState} from 'react';
import { StyleSheet, FlatList, Button, Alert } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  const [notes, setNotes] = React.useState([
    { title: 'ToDo', body: 'Eat\nShower\nDo Homework', key: '1' },
    { title: 'Homework', body: 'Math\nMobile Dev\nDatabase', key: '2' },
    { title: 'Shopping List', body: 'Eggs\nWater\nRice\nLamb', key: '3' },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <Text style={styles.body}>{ item.title }</Text>
        )}
      />
      {/*
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      */}
      <Button 
        title="Add Note"
        onPress={() => Alert.alert('Simple button pressed')}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  body: {
    fontSize: 14,
    marginLeft: 18,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  addnote: {
    fontSize: 16, 
  },
});
