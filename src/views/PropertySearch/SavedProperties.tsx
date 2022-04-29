import React, { useState, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./PropertySearchStyles";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import PropertyCard from "./PropertyCard";
import { Modalize } from "react-native-modalize";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";

const ASPECT_RATIO = ScreenWidth / ScreenHeight;
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type props = {};

const SavedProperties: React.FC<props> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { properties = [] } = route.params as any;
  console.log("saved properties", properties);
  const [layout, setMapLayout] = useState(1);
  const [saveProperty, setSaveProperty] = useState(true);
  const modalizeRef = useRef<Modalize>(null);
  const [markerData, setMarkerData] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 2,
              marginVertical: 5,
              height: 30,
            }}
          >
            <View
              style={{
                flex: 0.5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRightColor: "gray",
                borderRightWidth: 0.5,
              }}
            >
              <Text style={[styles.resetText, { color: "#0096FF" }]}>
                {"Map"}
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[styles.resetText, { color: "#0096FF" }]}>
                {"Filter"}
              </Text>
            </View>
          </View>
          {properties && properties.length > 0 && (
            <View style={{ flex: 1, borderTopWidth: 0.3 }}>
              {layout === 0 ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <MapView
                    // ref={(ref) => this.mapView = ref}
                    style={{
                      flex: 1,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                    mapType={"standard"}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    zoomControlEnabled={true}
                    zoomEnabled={true}
                    initialRegion={{
                      latitude: properties[0]?.Latitude ?? 0,
                      longitude: properties[0]?.Longitude ?? 0,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }}
                  >
                    {typeof properties &&
                      properties.map((item: any, index: any) => {
                        return (
                          <Marker
                            stopPropagation={true}
                            key={index}
                            coordinate={{
                              latitude: item?.Latitude ?? 0,
                              longitude: item?.Longitude ?? 0,
                            }}
                            onPress={() => {}}
                          >
                            <Image
                              source={require("../../assets/Images/Marker.png")}
                              style={{
                                width: Platform.OS === "ios" ? 35 : 35,
                                height: Platform.OS === "ios" ? 35 : 35,
                                resizeMode: "cover",
                                borderRadius: 35 / 2,
                                backgroundColor: "#FFFFFF",
                              }}
                            />
                          </Marker>
                        );
                      })}
                  </MapView>
                  <Modalize
                    ref={modalizeRef}
                    snapPoint={420}
                    adjustToContentHeight={true}
                    // closeSnapPointStraightEnabled={false}
                    // withOverlay={false}
                  >
                    <PropertyCard
                      listData={markerData}
                      marginVertical={10}
                      isSavedProperty={saveProperty}
                    ></PropertyCard>
                  </Modalize>
                </View>
              ) : (
                <View style={{ flex: 1, alignContent: "center" }}>
                  <ScrollView style={{ flex: 1 }}>
                    {properties.map((item: any, index: any) => {
                      return (
                        <PropertyCard
                          listData={item}
                          marginVertical={10}
                          isSavedProperty={saveProperty}
                        ></PropertyCard>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SavedProperties;
