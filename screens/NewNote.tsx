import React from 'react';
import { Platform, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import Notepad from '../components/Notepad';
import { Note } from '../types';
import Dialog from "react-native-dialog";

export default function NewNote({importData}: any) {
  const [note, setNote] = React.useState({
    title: 'Untitled Note',
    body: '',
  });
  const [visible, setVisible] = React.useState(false);
  const [notename, setNoteName] = React.useState({name: ''}); 

  const notepadCallback = React.useCallback((returnedNote) => {
    setNote({...note, body: returnedNote});
  }, []);

  
  const resetPage = () => {
    setNote({title: 'Untitled Note', body: ''});
    setNoteName({name: ''})
  };
  

  const saveNotes = () => {
    if(notename.name.length != 0) {
      const newNote = {title: notename.name, body: note.body};
      storeData(newNote); 
    } else{
      storeData(note);
    }
    setVisible(false);

  };

  const storeData = async (value: Note) => {
    try {
      let k = String(uuid.v4())
      value = {...value, key: k};
      importData(value);
      resetPage();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Notepad userNotes={note} notepadCallback={notepadCallback} />

        <Ionicons 
          name="add-circle"
          size={69}
          style={styles.saveButton}
          onPress={() => setVisible(true)}
        />

        <Dialog.Container visible={visible}>
          <Dialog.Title style={styles.savePromptTitle}>Add New Note</Dialog.Title>
          <Dialog.Description style={styles.savePrompt}>Enter a name for your new note</Dialog.Description>
          <Dialog.Input style={styles.savePrompt} onChangeText={(val) => setNoteName({name: val})} />
          <Dialog.Button label="Cancel" onPress= {() => setVisible(false)} />
          <Dialog.Button label="Confirm" onPress= {saveNotes} />
        </Dialog.Container>


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
  deleteButton: {
    color: 'red',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 15,
    bottom: 15,
  },
  saveButton: {
    color: 'orange',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: 15,
  },
  savePrompt: {
    ...Platform.select({
      android: {
        color: 'black'
      },
    }),
  },
  savePromptTitle: {
    ...Platform.select({
      android: {
        color: 'black',
        fontWeight: 'bold',
      },
    }),
  },
});
