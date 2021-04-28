import React from 'react';
import { StyleSheet, FlatList, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import Notecard from '../components/Notecard';
import EditNote from './Note';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, HomeProps } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import EditScreenInfo from '../components/EditScreenInfo';

export default function Home(props: HomeProps) {
  const {noteData, updateData} = props;
  //Finish importing notes from async storage and display as notes state instead of using fake data
  //Implement modal or something for note edit
  //const [notes, setNotes] = React.useState(noteData);
  const [editNote, setEditNote] = React.useState<Note | undefined>(undefined)
  const [modalOpen, setModalOpen] = React.useState(false);
  var temp = [...noteData];
  
  React.useEffect(() => {
    temp = [...noteData];
    console.log('temp');
    console.log(temp);
  }, [noteData]);

  //Acts like note doesnt exist until you ctrl + s
  const noteCallbackName = React.useCallback((returnedName, note) => {
    let index = noteData.indexOf(note);
    console.log('temp')
    console.log(temp);
    try {
      temp[index].title = returnedName;
    } catch (e) {
      console.error(e);
    }
    updateData(temp);
  }, []);

  const noteCallbackEdit = React.useCallback((edit, note) => {
    setModalOpen(edit);
    setEditNote(note);
  }, []);
  //Need to ctrl s or all notes delete
  const noteCallbackDelete = React.useCallback((note) => {
    temp = temp.filter((n) => n != note);
    updateData(temp);    
  }, []);

  return (
    <View style={styles.container}>
      <Modal visible={modalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContents}>
            <Ionicons
              name="arrow-back"
              size={50}
              style={styles.exitModalArrow}
              onPress={() => {setModalOpen(false)}}
            />
            <EditNote note={editNote} />
          </View>        
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.notesList}>
        <FlatList
          data={noteData}
          renderItem={({ item }) => (
            <Notecard
              userNotes={item}
              noteCallbackName={noteCallbackName}
              noteCallbackEdit={noteCallbackEdit}
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
  modalContents: {
    flex: 1,
    flexDirection: 'column',
  },
  exitModalArrow: {
    color: 'lightblue',
    left: 20,
    top: 30,
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
