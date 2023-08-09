import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Post from './Post'
import PlacesList from "../../components/Places/PlacesList"
// import PostList from '../../components/Posts/PostList'

const CheckIn = () => {
    return (
        <View style={{ flex: 1 }}>
            {/* <Text>CheckIn</Text> */}
            <PlacesList />
            {/* <Post /> */}
            {/* <PostList /> */}
        </View>
    )
}

export default CheckIn

const styles = StyleSheet.create({})