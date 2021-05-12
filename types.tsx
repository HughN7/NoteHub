/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
export interface Note {
  title: string;
  body: string;
  key?: string;
}

export interface NotepadProps {
  userNotes: Note;
  notepadCallback: (arg0: string) => void;
}

export interface NotecardProps {
  userNotes: Note;
  noteCallbackName: (arg0: string, arg1: Note) => void;
  noteCallbackEdit: (arg0: string, arg1: Note) => void;
  noteCallbackDelete: (arg0: Note) => void;
}

export interface HomeProps {
  noteData: Note[];
  handleDelete: (arg0: Note) => void;
}

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
