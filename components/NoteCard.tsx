import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function NoteCard(props: any) {
  //Add functionality to edit name/body or delete note
  return (
    <View style={styles.notecard}>
      <View style={styles.content}>{ props.children }</View>
    </View>
  )
}

const styles = StyleSheet.create({
  notecard: {
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
  content: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
});