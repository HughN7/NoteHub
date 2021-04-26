import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput, View } from './Themed';

export default function Notepad() {
  const [noteBody, setNoteBody] = React.useState('');
  const windowHeight = 3 * Dimensions.get('window').height / 4;

  return (
    <View style={styles.inputBox}>
      <TextInput
        multiline={true}
        scrollEnabled={true}
        minHeight={windowHeight}
        maxHeight={windowHeight}
        style={styles.input}
        onChangeText={(text) => setNoteBody(text)}
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
  input: {
    fontSize: 18,
    borderColor: 'rgba(34,34,34,255)',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
})