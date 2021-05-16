import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View } from '../components/Themed';
import Notecard from '../components/Notecard';
import { HomeProps } from '../types';

export default function Home(props: HomeProps) {
  const {noteData, handleDelete} = props;

  const noteCallbackDelete = React.useCallback((note) => {
    handleDelete(note);
  }, [noteData]);

  return (
    <View style={styles.container}>
      <View style={styles.notesList}>
        <FlatList
          data={noteData}
          renderItem={({ item }) => (
            <Notecard
              userNotes={item}
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
  exitModalArrow: {
    color: 'lightblue',
    left: 20,
    top: 40,
  },
  notesList: {
    marginLeft: 20,
    marginRight: 20,
  },
});
