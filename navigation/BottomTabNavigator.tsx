/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Navigation from '.';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomePage from '../screens/Home';
import Settings from '../screens/Settings';
import NotePad from '../screens/NotePad';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      
      <BottomTab.Screen
        name="New Note"
        title="New Note"
        component={NewNoteNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="add-circle" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Settings"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
        }}
      />
    
      
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() { //This is the home page
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={HomePage}
        options={{ headerTitle: 'Home' }}
      />
    </TabOneStack.Navigator>
  );
}

const NewNoteStack = createStackNavigator();

function NewNoteNavigator() {
  return (
    <NewNoteStack.Navigator>
      <NewNoteStack.Screen
        name="New Note Page"
        component={NotePad}
        options={{ headerTitle: 'New Note Page' }}
      />
    </NewNoteStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={Settings}
        options={{ headerTitle: 'Settings' }}
      />
    </TabTwoStack.Navigator>
  );
}

//Test