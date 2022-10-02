
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
   
         

     const firstElement = posts[5];


    const fetchData = () => {
        if (status === "idle") {
          dispatch(fetchPosts());
        }
 
    };
   

    useEffect(() => {
        
        fetchData();
    }, []);


    const animateToRegion = () => {
        mapRef.current.animateToRegion({
            latitude: firstElement.storeLocation.lat,
            longitude: firstElement.storeLocation.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };




  return (
    <View style={styles.container}>
        {status === "success" ? ( <MapView
  style={styles.map}
  initialRegion={{
    latitude: firstElement.storeLocation.lat,
    longitude: firstElement.storeLocation.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      }}
      loadingEnabled={true}
      userLocationCalloutEnabled={true}
      provider="google"
      scrollEnabled={true}
      rotateEnabled={true}
      showsUserLocation={true}
      showsTraffic={true}
      zoomEnabled={true}
      showsMyLocationButton={true}
      ref={mapRef}
  >
  
        
 <MarkerAnimated
    key={0}
    coordinate={{
        latitude:15.327471275674935,
        longitude: 44.19993475096826,
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

  </MapView>) : null}
 
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