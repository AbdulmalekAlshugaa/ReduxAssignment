import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { store } from './src/store/store';
import {Provider} from 'react-redux';

 import {successFetchPostData, cleanPostData, failedFetchPostData} from './src/store/reducer/fetchDataSlice'
 import {useSelector, useDispatch} from 'react-redux';
import ListingItemScreen from './src/screen/ListingItemScreen';




export default function App() {
//  const dispatch = useDispatch()
// const posts = useSelector((state) => state.posts);
//  console.log('store.getState()');

//  useEffect(() => {
//     dispatch(successFetchPostData());
   
//   }, []);


  
  return (
  
      <Provider store={store}>
        <ListingItemScreen/>
        </Provider>
      
      
      
     
     
  
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
