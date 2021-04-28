import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import Notepad from '../components/Notepad';
import { Note } from '../types';


export default function EditNote(note: Note) {
  //Go in with note, display body, let user edit body, pass back body as string

  const notepadCallback = React.useCallback(() => {

  }, []);
  console.log(note.body);
  return (
    <View style={styles.container}>
      <Notepad userNotes={note} notepadCallback={notepadCallback} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})