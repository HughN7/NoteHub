import * as React from 'react';
import { useState} from 'react';
import { StyleSheet, FlatList, Button, Alert, Modal } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteCard from '../components/NoteCard';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabOneScreen() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [notes, setNotes] = React.useState([
    { title: 'ToDo', body: 'Eat\nShower\nDo Homework', key: '1' },
    { title: 'Homework', body: 'Math\nMobile Dev\nDatabase', key: '2' },
    { title: 'Shopping List', body: 'Eggs\nWater\nRice\nLamb', key: '3' },
  ]);

  const addNote = (note: any) => {
    note.key = Math.random().toString(); //need to set up uid
    setNotes((currentNotes) => {
      return [...currentNotes, note]
    });
    setModalOpen(false);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <NoteCard>
            <Text style={styles.body}>{ item.title }</Text>
          </NoteCard>     
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
  },
  body: {
    fontSize: 16,
    marginLeft: 18,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  addnotebutton: {
    color: 'white',
    alignSelf: 'flex-end', 
  }
});
