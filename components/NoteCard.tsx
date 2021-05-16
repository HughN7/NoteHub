import React from 'react';
import { Platform, StyleSheet, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, TextInput, View } from './Themed';
import useColorScheme from '../hooks/useColorScheme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NotecardProps } from '../types';
import Dialog from "react-native-dialog";

const windowWidth = 5 * Dimensions.get('window').width / 8;

export default function Notecard(note: NotecardProps) {
  const {userNotes, noteCallbackDelete} = note;
  
  const [title, setTitle] = React.useState(userNotes.title);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [body, setBody] = React.useState(userNotes.body);
  const [visDelete, setVisDelete] = React.useState(false);
  
  const windowHeight = 5 * Dimensions.get('window').height / 8;
  const colorScheme = useColorScheme();

  const editNote = () => {
    setModalOpen(false);
    if (title.length != 0) {
      userNotes.title = title;
    }
    userNotes.body = body;
  };

  const deleteNote = () => {
    setVisDelete(false);
    noteCallbackDelete(userNotes);
  }

  return (
    <View style={styles.card}>

      <Modal visible={modalOpen} animationType='slide' transparent={false}>
        
          <View style={styles.modalContents}>
            <Ionicons
              name="arrow-back"
              size={50}
              style={(colorScheme === 'dark') ? styles.exitModalArrowDark : styles.exitModalArrowLight}
              onPress={editNote}
            />
            {/* <EditNote /> */}
            <View style={styles.notePad}>
              <TextInput
                multiline={false}
                scrollEnabled={false}
                style={styles.notePadTitle}
                value={title}
                onChangeText={(e) => setTitle(e)}
              />
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
              <TextInput
                multiline={true}
                scrollEnabled={true}
                maxHeight={windowHeight}
                style={(colorScheme === 'dark') ? styles.inputDark : styles.inputLight}
                value={body}
                onChangeText={(e) => setBody(e)}
                autoFocus={true}
              />
            </View>
          </View>        
        
      </Modal>

      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <View style={(colorScheme === 'dark') ? styles.notecardDark : styles.notecardLight}>
          <Text style={styles.body}>{ userNotes.title }</Text>
        </View>
      </TouchableOpacity>

      <MaterialIcons
        name="delete"
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
  notecardDark: { 
    width: windowWidth,
    elevation: 3,
    backgroundColor: '#777',
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#aaa',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 7,
  },
  notecardLight: { 
    width: windowWidth,
    elevation: 3,
    backgroundColor: '#bbb',
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#aaa',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 7,
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
    color: 'grey',
    paddingTop: 10,
    paddingLeft: 15,
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
  modalContents: {
    flex: 1,
  },
  notePad: {
    top: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  notePadTitle: {
    fontSize: 25,
  },
  separator: {
    height: 1,
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
  },
  exitModalArrowDark: {
    color: 'white',
    left: 20,
    top: 40,
  },
  exitModalArrowLight: {
    color: 'black',
    left: 20,
    top: 40,
  },
  inputDark: {
    fontSize: 18,
    borderColor: '#777',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  inputLight: {
    fontSize: 18,
    borderColor: '#bbb',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
});