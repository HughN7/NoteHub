import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notecard from '../components/Notecard';
import { Note } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import EditScreenInfo from '../components/EditScreenInfo';
import { MaterialIcons } from '@expo/vector-icons';

export default function Home({noteData}: any, {updateData}: any) {
  //Finish importing notes from async storage and display as notes state instead of using fake data
  //Implement modal or something for note edit
  const [notes, setNotes] = React.useState(noteData);

  React.useEffect(() => {
    setNotes(noteData);
  }, [noteData]);

  const noteCallbackName = React.useCallback((returnedName, note) => {
    let index = notes.indexOf(note);
    let temp = { title: returnedName, body: note.body, key: note.key };
    let newNotes = [...notes];
    newNotes.splice(index, 1, temp);
    setNotes(newNotes);
  }, []);

  const noteCallbackDelete = React.useCallback((note) => {
    let index = notes.indexOf(note);
    let newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.notesList}>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <Notecard
              userNotes={item}
              noteCallbackName={noteCallbackName}
              noteCallbackDelete={noteCallbackDelete}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  notesList: {
    marginLeft: 20,
    marginRight: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
