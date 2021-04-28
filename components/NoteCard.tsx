import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Text } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { NotecardProps } from '../types';

const windowWidth = 5 * Dimensions.get('window').width / 8;

export default function Notecard(note: NotecardProps) {
  const {userNotes, noteCallbackName, noteCallbackEdit, noteCallbackDelete} = note;

  const renameNote = () => {
    Alert.prompt("Rename Note",
    "Enter a new name for your note: ",
    [
      {
        text: "Cancel",
        style: "default",
      },
      {
        text: "Confirm",
        onPress: (name) => {
          if (name) {
            noteCallbackName(name, userNotes);
          } else {
            Alert.alert("Note name cannot be empty!");
          }
        },
        style: "default",
      },
    ]);
  }

  const editNote = () => {noteCallbackEdit(true, userNotes)}

  const deleteNote = () => {
    Alert.alert("Delete Note",
    "Are you sure you would like to delete this note?",
    [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        onPress: () => {noteCallbackDelete(userNotes)},
        style: "default",
      },
    ])
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={renameNote}>
        <View style={styles.notecard}>
          <Text style={styles.body}>{ userNotes.title }</Text>
        </View>
      </TouchableOpacity>
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
        onPress={deleteNote}
      />
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
});