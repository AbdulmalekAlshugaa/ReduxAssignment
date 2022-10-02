import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Callout, MarkerAnimated } from "react-native-maps";
import {
  fetchPosts,
  successFetchPostData,
  cleanPostData,
  failedFetchPostData,
} from "../store/reducer/fetchDataSlice";


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 3;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default function ListingItemScreen() {
  // call use location hook

  const scrollX = useRef(new Animated.Value(0)).current;
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.postsList);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const firstElement = posts[5];

  const interpolations = posts.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [1, 2.5, 1],
      extrapolate: "clamp",
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.35, 1, 0.35],
      extrapolate: "clamp",
    });
    return { scale, opacity };
  });

  const fetchData = () => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  };

  useEffect(() => {
    fetchData();
     if (status === "success") {
        animateToRegion({latitude: firstElement.latitude, longitude: firstElement.longitude});
    }

  }, []);

  const animateToRegion = ({latitude,longitude }) => {
    mapRef.current.animateToRegion({
      latitude: firstElement.storeLocation.lat,
      longitude: firstElement.storeLocation.lng,
   
    });
  };

  const renderSearchResult = () => {
      return <View>
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => console.log(text)}
                value={""}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                
            />
      </View>
  }

  return (
    <View style={styles.container}>


      {status === "success" ? (
        <MapView
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
          {posts.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker
                key={index}
                anchor={{x: 0.5, y: 0.5}}
                description={marker.storeName}
                title={marker.storeCategory}
                onPress={() => {
                    console.log(marker.storeName);
                    animateToRegion({latitude: marker.latitude, longitude: marker.longitude});
                }}
                draggable
                coordinate={{
                  latitude: marker.storeLocation.lat,
                  longitude: marker.storeLocation.lng,
                }}
              >
                {/* <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                  <Image
                    source={{ uri: marker.storeImage }}
                    style={{ height: 35, width: 35 }}
                  />
                </Animated.View> */}
              </MapView.Marker>
            );
          })}

          <Callout
            tooltip={true}
            onPress={() => {
              console.log("callout pressed");
            }}
          />
        </MapView>
      ) : null}

      <StatusBar style="auto" />
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        style={styles.scrollView}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        contentContainerStyle={styles.endPadding}
      >
        {posts.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={{ uri: marker.storeImage }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.storeName}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  style={[
                    styles.book,
                    {
                      borderColor: "#FF6347",
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textbook,
                      {
                        color: "#FF6347",
                      },
                    ]}
                  >
                    Book Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  scrollView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: 10,
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
});
