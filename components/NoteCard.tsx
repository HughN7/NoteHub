import React from 'react';
import { Platform, StyleSheet, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Text } from './Themed';
import { Ionicons } from '@expo/vector-icons';
import { NotecardProps } from '../types';
import Dialog from "react-native-dialog";

const windowWidth = 5 * Dimensions.get('window').width / 8;

export default function Notecard(note: NotecardProps) {
  const {userNotes, noteCallbackName, noteCallbackEdit, noteCallbackDelete} = note;
  const [visRename, setVisRename] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [visDelete, setVisDelete] = React.useState(false);


  const renameNote = () => {
    if (newName.length != 0) {
      setVisRename(false);
      noteCallbackName(newName, userNotes);
    }
  }

  const editNote = () => {noteCallbackEdit(true, userNotes)}

  const deleteNote = () => {
    setVisDelete(false);
    noteCallbackDelete(userNotes);
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => setVisRename(true)}>
        <View style={styles.notecard}>
          <Text style={styles.body}>{ userNotes.title }</Text>
        </View>
      </TouchableOpacity>

      <Dialog.Container visible={visRename}>
        <Dialog.Title style={styles.savePromptTitle}>Rename Note</Dialog.Title>
        <Dialog.Description style={styles.savePrompt}>Enter a new name for your note (Name cannot be empty)</Dialog.Description>
        <Dialog.Input style={styles.savePrompt} onChangeText={(e) => setNewName(e)} />
        <Dialog.Button label="Cancel" onPress={() => setVisRename(false)} />
        <Dialog.Button label="Confirm" onPress={renameNote} />
      </Dialog.Container>

      <Ionicons
        name="create"
        size={windowWidth/5}
        style={styles.editButton}
        onPress={editNote}
      />
      <Ionicons
        name="trash"
        size={windowWidth/5}
        style={styles.deleteButton}
        onPress={() => setVisDelete(true)}
      />

      <Dialog.Container visible={visDelete}>
        <Dialog.Title>Delete Note</Dialog.Title>
        <Dialog.Description>Are you sure you would like to delete this note?</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setVisDelete(false)} />
        <Dialog.Button label="Confirm" onPress={deleteNote} />
      </Dialog.Container>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  notecard: { 
    width: windowWidth,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#777',
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#aaa',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  body: {
    fontSize: 16,
    marginHorizontal: 18,
    marginVertical: 20,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  editButton: {
    color: 'orange',
  },
  deleteButton: {
    color: 'red',
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