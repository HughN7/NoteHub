import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput, View } from './Themed';
import useColorScheme from '../hooks/useColorScheme';
import { NotepadProps } from '../types';

export default function Notepad(props: NotepadProps) {
  const {userNotes, notepadCallback} = props;
  
  const windowHeight = 5 * Dimensions.get('window').height / 8;
  const colorScheme = useColorScheme();

  return (
    <View style={styles.inputBox}>
      <TextInput
        multiline={true}
        scrollEnabled={true}
        maxHeight={windowHeight}
        style={(colorScheme === 'dark') ? styles.inputDark : styles.inputLight}
        value={userNotes.body}
        onChangeText={(text: string) => notepadCallback(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 25,
    marginBottom: 75,
    marginLeft: 25,
    marginRight: 25,
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