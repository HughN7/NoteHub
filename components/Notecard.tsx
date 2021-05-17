import React from 'react';
import { Platform, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Text, TextInput, View } from './Themed';
import useColorScheme from '../hooks/useColorScheme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NotecardProps } from '../types';
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-async-storage/async-storage';
import email from 'react-native-email';

const windowWidth = 5 * Dimensions.get('window').width / 8;

export default function Notecard(note: NotecardProps) {
  const {userNotes, noteCallbackDelete} = note;
  
  const [title, setTitle] = React.useState(userNotes.title);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [body, setBody] = React.useState(userNotes.body);
  const [visDelete, setVisDelete] = React.useState(false);
  
  const [visEmail, setVisEmail] = React.useState(false);
  const [to, setTo] = React.useState('');

  const windowHeight = 5 * Dimensions.get('window').height / 8;
  const colorScheme = useColorScheme();

  const editNote = async () => {
    try{
      setModalOpen(false);
      if (title.length != 0) {
        userNotes.title = title;
      }
      userNotes.body = body;

      const jsonValue = JSON.stringify(userNotes)
      await AsyncStorage.setItem(userNotes.key as string, jsonValue)

    } catch (e) {
      console.error(e);
    }
    
  };

  const deleteNote = async () => {
    try{
      setVisDelete(false);
      noteCallbackDelete(userNotes);

      await AsyncStorage.removeItem(userNotes.key as string)

    } catch (e) {
      console.error(e);
    }
    
  }

  const handleEmail = () => {
    setVisEmail(false);
    email(to, { 
      subject: title,
      body: body,
    });
  }

  return (
    <View style={styles.card}>

      <Modal visible={modalOpen} animationType='slide' transparent={false}>
        
          <View style={styles.modalContents}>
            {/*<Ionicons
              name="arrow-back"
              size={50}
              style={(colorScheme === 'dark') ? styles.exitModalArrowDark : styles.exitModalArrowLight}
              onPress={editNote}
            />*/}

            {/*<Ionicons
              name="mail"
              size={50}
              style={(colorScheme === 'dark') ? styles.emailDark : styles.emailLight}
              onPress={() => setVisEmail(true)}
            />*/}

            <Dialog.Container visible={visEmail}>
              <Dialog.Title style={styles.savePromptTitle}>Email Note</Dialog.Title>
              <Dialog.Description style={styles.savePrompt}>Enter the email address you would like to send this note to</Dialog.Description>
              <Dialog.Input style={styles.savePrompt} onChangeText={(val) => setTo(val)} />
              <Dialog.Button label="Cancel" onPress={() => setVisEmail(false)} />
              <Dialog.Button label="Confirm" onPress={handleEmail} />
            </Dialog.Container>

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

            <MaterialIcons 
              name="check-circle"
              size={69}
              style={styles.saveButton}
              onPress={editNote}
            />

            <MaterialIcons
              name="share"
              size={69}
              style={(colorScheme === 'dark') ? styles.shareButtonDark : styles.shareButtonLight}
              onPress={() => setVisEmail(true)}
            />

          </View>        
        
      </Modal>

      <TouchableOpacity onPress={() => setModalOpen(true)} onLongPress={() => setVisDelete(true)}>
        <View style={(colorScheme === 'dark') ? styles.notecardDark : styles.notecardLight}>
          <Text style={styles.body}>{ userNotes.title }</Text>
        </View>
      </TouchableOpacity>

      <Dialog.Container visible={visDelete}>
        <Dialog.Title style={styles.savePromptTitle} >Delete Note</Dialog.Title>
        <Dialog.Description style={styles.savePrompt}>Are you sure you would like to delete this note?</Dialog.Description>
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
    minWidth: "100%",
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
    minWidth: "100%",
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
    top: 20,
  },
  exitModalArrowLight: {
    color: 'black',
    left: 20,
    top: 20,
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
  saveButton: {
    color: 'orange',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: 15,
  },
  shareButtonDark: {
    color: 'white',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: 100,
  },
  shareButtonLight: {
    color: 'black',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: 100,
  },
});
