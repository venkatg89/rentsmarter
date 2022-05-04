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
import { ButtonGroup, Text, Input, Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { Slider } from "@miblanchard/react-native-slider";

type props = {};

const bedRooms = ["Any", "Studio", "1", "2", "3", "4", "5+"];
const bathRooms = ["Any", "1", "2", "3+"];
const Item = Picker.Item;

const PropertySearchFilters: React.FC<props> = ({}) => {
  const [selectedBedRoom, setSelectedBedRoom] = useState(0);
  const [selectedBathRoom, setSelectedBathRoom] = useState(0);
  const [selectedMinSquareFeet, setSelectedMinSquareFeet] = useState("900");
  const [selectedMaxSquareFeet, setSelectedMaxSquareFeet] = useState("1100");
  const [selectedMonthlyRent, setSelectedMonthlyRent] = useState([400, 800]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[instyles.text, { flex: 0.5 }]} h4>
              Montly Rent
            </Text>
            <Input
              containerStyle={{
                flex: 0.3,
              }}
              placeholder="Min Rent"
              leftIcon={{ type: "font-awesome", name: "dollar", size: 20 }}
              value={
                selectedMonthlyRent.length > 0
                  ? `${selectedMonthlyRent[0]}`
                  : ``
              }
            />
            <Text
              style={[
                {
                  flex: 0.1,
                  alignSelf: "center",
                },
              ]}
              h4
            >
              -
            </Text>
            <Input
              containerStyle={{ flex: 0.3 }}
              placeholder="Max Rent"
              leftIcon={{ type: "font-awesome", name: "dollar", size: 20 }}
              value={
                selectedMonthlyRent.length > 0
                  ? `${selectedMonthlyRent[1]}`
                  : ``
              }
            />
          </View>
          {/* <SliderContainer
            caption="<Slider/> with custom style"
            sliderValue={[400, 800]}
          > */}
          <Slider
            containerStyle={{ marginHorizontal: 10 }}
            animateTransitions
            maximumTrackTintColor="#d3d3d3"
            maximumValue={2000}
            minimumTrackTintColor="#1fb28a"
            minimumValue={0}
            value={selectedMonthlyRent}
            step={10}
            thumbTintColor="#1a9274"
            onValueChange={(value) => setSelectedMonthlyRent(value)}
          />
          {/* </SliderContainer> */}
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
