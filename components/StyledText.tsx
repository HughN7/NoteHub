import * as React from 'react';

import { Text, TextProps, TextInput, TextInputProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export function MonoTextInput(props: TextInputProps) {
  return <TextInput {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
