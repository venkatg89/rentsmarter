import React, { useState, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from "react-native";
import styles from "./PropertySearchStyles";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
const { width } = Dimensions.get("window");
import PropertyCard from "./PropertyCard";
import { BaseSearch } from "../BaseSearch";
import { SearchBar } from "react-native-elements";
import Fonts from "../../Themes/Fonts";
import { Modalize } from "react-native-modalize";
import Modal from "react-native-modal";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";
import Filter from "./Filter";

const screen = Dimensions.get("window");
const ASPECT_RATIO = ScreenWidth / ScreenHeight;
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const zipData = require("./zip-repo.json");
const mockData = require("./mockData.json");
type props = {
  screen: any | undefined;
  setSearchScreen: () => void | undefined;
  search: any | undefined;
};
const PropertyMapView: React.FC<props> = ({
  screen,
  setSearchScreen,
  search = "76522",
}) => {
  console.log("search:::", search);
  const _filteredData = Object.keys(zipData)
    .filter((key) => search === key)
    .reduce((obj, key) => {
      obj = zipData[key];
      return obj;
    }, {});

  console.log("filteredData:::", _filteredData);

  const [layout, setMapLayout] = useState(0);
  const [showMpas, setShowMaps] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saveProperty, setSaveProperty] = useState(false);
  const modalizeRef = useRef<Modalize>(null);
  const [markerData, setMarkerData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [toHigh, setToHight] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("price");
  const [data, setData] = useState(mockData);
  const [filteredData, setFilteredData] = useState(_filteredData);

  function OnMarkerSelected(value: any): void {
    // setShowMaps(!showMpas)
    setShowModal(true);
    modalizeRef.current?.open();
    setMarkerData(value);
  }

  function OnSavePropertyClick(): void {
    setSaveProperty(!saveProperty);
  }

  function ShowFilterModal(): void {
    setShowFilter(!showFilter);
  }

  useEffect(() => {
    sortFilters(selectedFilter);
  }, [selectedFilter, toHigh]);

  const sortFilters = (item: string) => {
    if (item === "price") {
      const sorted = data.data.sort((a, b) =>
        toHigh ? b.ListPrice - a.ListPrice : a.ListPrice - b.ListPrice
      );
      setFilteredData(sorted);
    }

    if (item === "bedrooms") {
      const sorted = data.data.sort((a, b) =>
        toHigh
          ? b.BedroomsTotal - a.BedroomsTotal
          : a.BedroomsTotal - b.BedroomsTotal
      );
      setFilteredData(sorted);
    }

    if (item === "bathrooms") {
      const sorted = data.data.sort((a, b) =>
        toHigh
          ? b.BathroomsTotalInteger - a.BathroomsTotalInteger
          : a.BathroomsTotalInteger - b.BathroomsTotalInteger
      );
      setFilteredData(sorted);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.1,
              backgroundColor: "#FFFFFF",
              marginBottom: 10,
              flexDirection: "row",
              borderTopWidth: 0.3,
            }}
          >
            <View
              style={{
                flex: 0.15,
                alignItems: "center",
                marginTop: 15,
              }}
            >
              {layout === 0 ? (
                <Text
                  style={styles.listText}
                  onPress={() => setMapLayout(layout + 1)}
                >
                  List
                </Text>
              ) : (
                <Text style={styles.listText} onPress={() => setMapLayout(0)}>
                  Map
                </Text>
              )}
            </View>
            <View
              style={{
                flex: 0.7,
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={() => setSearchScreen(0)}>
                <BaseSearch
                  key={"SearchContainer"}
                  placeholderText={search}
                  accessibilityLabel={"searchBar"}
                  location={"map"}
                  setSearchScreen={setSearchScreen}
                  defaultMapSearch={search}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0.15,
                alignItems: "center",
                marginTop: 15,
                marginRight: 10,
              }}
            >
              <Text style={styles.listText}>Filters</Text>
            </View>
          </View>
          {filteredData && filteredData.length > 0 ? (
            <View style={{ flex: 1, borderTopWidth: 0.3 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 2,
                  marginVertical: 5,
                }}
              >
                <View style={{ flex: 0.5, flexDirection: "row" }}></View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={[styles.sortText, { paddingHorizontal: 2 }]}>
                    Sort by
                  </Text>
                  <Text
                    style={[styles.sortText, { color: "#0096FF" }]}
                    onPress={() => setShowFilter(true)}
                  >
                    {toHigh ? "(Low to High)" : "(High to Low)"}
                  </Text>
                </View>
              </View>
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
                      latitude: filteredData[0]?.Latitude ?? 0,
                      longitude: filteredData[0]?.Longitude ?? 0,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }}
                  >
                    {typeof filteredData &&
                      filteredData.map((item: any, index: any) => {
                        return (
                          <Marker
                            stopPropagation={true}
                            key={index}
                            coordinate={{
                              latitude: item?.Latitude ?? 0,
                              longitude: item?.Longitude ?? 0,
                            }}
                            onPress={() => OnMarkerSelected(item)}
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
                      saveProperty={saveProperty}
                      OnSavePropertyClick={OnSavePropertyClick}
                    ></PropertyCard>
                  </Modalize>
                </View>
              ) : (
                <View style={{ flex: 1, alignContent: "center" }}>
                  <ScrollView style={{ flex: 1 }}>
                    {filteredData.map((item: any, index: any) => {
                      return (
                        <PropertyCard
                          listData={item}
                          marginVertical={10}
                          saveProperty={saveProperty}
                          OnSavePropertyClick={OnSavePropertyClick}
                        ></PropertyCard>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={require("../../assets/Images/Marker.png")} />
              <Text style={styles.errorHeader}>Sorry, data not found</Text>
              <Text style={styles.errorDescription}>
                We could not find any results that match Your criteria. Please
                check with spelling or try typing the full address.
              </Text>
              <Text style={styles.errorDescription}>
                Try expanding your search by{" "}
                <Text
                  style={styles.errorFilterDescription}
                  onPress={() => ShowFilterModal()}
                >
                  adjusting your filters{" "}
                </Text>
                or try different location.
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
      {showFilter && (
        <Modal
          isVisible={showFilter}
          backdropColor={"white"}
          propagateSwipe={true}
          style={{ margin: 0, flex: 1 }}
        >
          <Filter
            ShowFilterModal={ShowFilterModal}
            toHigh={toHigh}
            defaultFilter={selectedFilter}
            setToHeigh={(value) => {
              setToHight(value);
            }}
            onChange={(value) => {
              setSelectedFilter(value);
              sortFilters(value);
            }}
          />
        </Modal>
      )}
    </View>
  );
};

export default PropertyMapView;
