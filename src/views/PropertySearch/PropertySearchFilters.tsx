import React, { useState, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import styles from "./PropertySearchStyles";
import { ButtonGroup, Text } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";

type props = {};

const bedRooms = ["Any", "Studio", "1", "2", "3", "4", "5+"];
const bathRooms = ["Any", "1", "2", "3+"];
const Item = Picker.Item;

const PropertySearchFilters: React.FC<props> = ({}) => {
  const [selectedBedRoom, setSelectedBedRoom] = useState(0);
  const [selectedBathRoom, setSelectedBathRoom] = useState(0);
  const [selectedMinSquareFeet, setSelectedMinSquareFeet] = useState("900");
  const [selectedMaxSquareFeet, setSelectedMaxSquareFeet] = useState("1100");

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <Text style={instyles.text} h4>
            Bedrooms
          </Text>
          <ButtonGroup
            buttons={bedRooms}
            selectedIndex={selectedBedRoom}
            onPress={(value) => {
              setSelectedBedRoom(value);
            }}
            containerStyle={{ marginBottom: 20 }}
          />
          <Text style={instyles.text} h4>
            Bathrooms
          </Text>
          <ButtonGroup
            buttons={bathRooms}
            selectedIndex={selectedBathRoom}
            onPress={(value) => {
              setSelectedBathRoom(value);
            }}
            containerStyle={{ marginBottom: 20 }}
          />
          <Text style={instyles.text} h4>
            Squarefeet
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 0.5 }}>
              <Text
                style={{ textAlign: "center", textAlignVertical: "center" }}
              >
                {"Minimum"}
              </Text>
              <Picker
                selectedValue={selectedMinSquareFeet}
                onValueChange={(v) => setSelectedMinSquareFeet(v)}
                mode={"dropdown"}
              >
                <Item label="900" value="900" />
                <Item label="1000" value="1000" />
              </Picker>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text
                style={{ textAlign: "center", textAlignVertical: "center" }}
              >
                {"Maximum"}
              </Text>
              <Picker
                selectedValue={selectedMaxSquareFeet}
                onValueChange={(v) => setSelectedMaxSquareFeet(v)}
              >
                <Item label="1100" value="1100" />
                <Item label="1200" value="1200" />
                <Item label="1240" value="1240" />
                <Item label="1290" value="1290" />
              </Picker>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const instyles = StyleSheet.create({
  text: {
    textAlign: "left",
    padding: 5,
  },
});

export default PropertySearchFilters;
