import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ROUTES from '.'
import { useTheme } from "@react-navigation/native";
import Post from '../screens/CheckIn/Post';
import CheckIn from '../screens/CheckIn/CheckIn';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
function CheckinStack() {
    const theme = useTheme();
    return (
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen
                name={ROUTES.HEDERROUTES.CHECKIN_STACK.CHECKIN}
                component={CheckIn}
            />
            <Stack.Screen
                name={ROUTES.HEDERROUTES.CHECKIN_STACK.POST}
                component={Post}
            />
        </Stack.Navigator>
    )
}

export default CheckinStack
