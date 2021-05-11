import React from 'react';
import { StyleSheet, FlatList, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import Notecard from '../components/Notecard';
import EditNote from './Note';
import { Note, HomeProps } from '../types';

export default function Home(props: HomeProps) {
  const {noteData, handleDelete} = props;
  //Implement modal or something for note edit
  const [notes, setNotes] = React.useState(noteData);
  const [editNote, setEditNote] = React.useState<Note | undefined>(undefined)
  const [modalOpen, setModalOpen] = React.useState(false);
  
  React.useEffect(() => {
    async function getNotes() {
      setNotes(noteData);
    }
    getNotes();
  }, [noteData]);

  const noteCallbackName = React.useCallback((returnedName, note) => {
    note.title = returnedName;
  }, []);

  const noteCallbackEdit = React.useCallback((edit, note) => {
    // setModalOpen(edit);
    // setEditNote(note);
  }, []);
  //Need to ctrl s or all notes delete
  const noteCallbackDelete = React.useCallback((note) => {
    handleDelete(note); 
  }, []);
  console.log(notes);
  
  return (
    <View style={styles.container}>
      {/* <Modal visible={modalOpen} animationType='slide'>
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
      </Modal> */}

      <View style={styles.notesList}>
        <FlatList
          data={notes}
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
