import React from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notepad from '../components/Notepad';
import { Note } from '../types';

import uuid from 'react-native-uuid';
import EditScreenInfo from '../components/EditScreenInfo';
import NotFoundScreen from './NotFoundScreen';

export default function NewNote() {
  //If time try to find a way to add a text editor toolbar
  //Only way I can think of though is implementing rich text editor for it
  const [note, setNote] = React.useState({
    title: 'Untitled Note',
    body: '',
  })
  const windowHeight = 3 * Dimensions.get('window').height / 4;
  
  const notepadCallback = React.useCallback((returnedNote) => {
    setNote({...note, body: returnedNote});
  }, [])

  const saveNote = () => {
    Alert.prompt("Save Note",
    "Enter a name for your new note:",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: (name) => {
          if (name) {
            const newNote = {title: name, body: note.body}; //Alt solution bc react hooks are async
            storeData(newNote);
          } else {
            storeData(note)
          }
        }
      },
    ]);
  }

  const storeData = async (value: Note) => {
    try {
      let k = String(uuid.v4())
      value = {...value, key: k};
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(k, jsonValue);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Notepad userNotes={note} notepadCallback={notepadCallback} />
        
        <Ionicons 
          name="add-circle"
          size={69}
          style={styles.saveButton}
          onPress={saveNote}
      />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBox: {
    marginTop: 25,
    marginBottom: 75,
    marginLeft: 25,
    marginRight: 25,
  },
  input: {
    fontSize: 18,
    borderColor: 'rgba(34,34,34,255)',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  saveButton: {
    color: 'orange',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: 15,
    //marginRight: 25,
  },
});
