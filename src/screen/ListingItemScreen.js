
import React, { useEffect,useRef } from 'react'
import { StyleSheet, Text, View ,Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useSelector, useDispatch,} from 'react-redux';
import MapView, { Callout, MarkerAnimated } from 'react-native-maps';
import {fetchPosts,successFetchPostData, cleanPostData, failedFetchPostData } from '../store/reducer/fetchDataSlice';

export default function ListingItemScreen() {
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.postsList);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);


    console.log("posts", posts);

    const fetchData = () => {
        dispatch(fetchPosts());
    };
   

    useEffect(() => {
        animateToRegion();
        fetchData();
    }, []);


    const animateToRegion = () => {
        mapRef.current.animateToRegion({
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };




  return (
    <View style={styles.container}>
  <MapView
  style={styles.map}
  initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      }}
      
      userLocationCalloutEnabled={true}
      provider="google"
      scrollEnabled={true}
      rotateEnabled={true}
      showsUserLocation={true}
      showsTraffic={true}
      showsMyLocationButton={true}
      ref={mapRef}
  >
    <MarkerAnimated
    coordinate={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }}
    title="My Marker"
    description="Some description"
    />

    <Callout
    tooltip={true}
    onPress={() => {
        console.log("callout pressed");
    }}
    
    />

  </MapView>
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
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
  });