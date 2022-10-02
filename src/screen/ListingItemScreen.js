
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useSelector, useDispatch,} from 'react-redux';
import {fetchPosts,successFetchPostData, cleanPostData, failedFetchPostData } from '../store/reducer/fetchDataSlice';
export default function ListingItemScreen() {
  
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.postsList);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);


    console.log("posts", posts);

    const fetchData = () => {
        dispatch(fetchPosts());
    };
   

    useEffect(() => {
        fetchData();
    }, []);





  return (
    <View style={styles.container}>
    <Text>Open up App.js to start working on your second page !</Text>
    <StatusBar style="auto" />
  </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
  });