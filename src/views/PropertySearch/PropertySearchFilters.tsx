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
const Min_Monthly_Rent = 0;
const Max_Monthly_Rent = 2000;
const Default_Min_Monthly_Rent = 400;
const Default_Max_Monthly_Rent = 800;

const PropertySearchFilters: React.FC<props> = ({}) => {
  let sliderRef: any = null;

  const [selectedBedRoom, setSelectedBedRoom] = useState([]);
  const [selectedBathRoom, setSelectedBathRoom] = useState([]);
  const [selectedMinSquareFeet, setSelectedMinSquareFeet] = useState("900");
  const [selectedMaxSquareFeet, setSelectedMaxSquareFeet] = useState("1100");
  const [selectedMonthlyRent, setSelectedMonthlyRent] = useState([
    Default_Min_Monthly_Rent,
    Default_Max_Monthly_Rent,
  ]);
  const [minMonthlyRent, setMinMonthlyRent] = useState(
    Default_Min_Monthly_Rent.toString()
  );
  const [maxMonthlyRent, setMaxMonthlyRent] = useState(
    Default_Max_Monthly_Rent.toString()
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[instyles.text, { flex: 0.5 }]} h4>
              Montly Rent
            </Text>
            <Input
              keyboardType={"numeric"}
              containerStyle={{
                flex: 0.3,
              }}
              placeholder="Min Rent"
              leftIcon={{ type: "font-awesome", name: "dollar", size: 20 }}
              value={minMonthlyRent}
              onChangeText={(text) => {
                if (
                  parseInt(text) >= Min_Monthly_Rent &&
                  parseInt(text) <= Max_Monthly_Rent
                ) {
                  const item = [parseInt(text), parseInt(maxMonthlyRent)];
                  console.log("item", item);
                  setSelectedMonthlyRent(item);
                }
                setMinMonthlyRent(text);
              }}
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
              value={maxMonthlyRent}
              onChangeText={(text) => {
                if (
                  parseInt(text) >= Min_Monthly_Rent &&
                  parseInt(text) <= Max_Monthly_Rent
                ) {
                  const item = [parseInt(minMonthlyRent), parseInt(text)];
                  console.log("item", item);
                  setSelectedMonthlyRent(item);
                }
                setMaxMonthlyRent(text);
              }}
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
            maximumValue={Max_Monthly_Rent}
            minimumTrackTintColor="#1fb28a"
            minimumValue={Min_Monthly_Rent}
            value={selectedMonthlyRent}
            thumbTintColor="#1a9274"
            step={1}
            onValueChange={(value) => {
              setMinMonthlyRent(value[0].toString());
              setMaxMonthlyRent(value[1].toString());
              setSelectedMonthlyRent(value);
            }}
          />
          {/* </SliderContainer> */}
          <Text style={instyles.text} h4>
            Bedrooms
          </Text>
          <ButtonGroup
            selectMultiple={true}
            buttons={bedRooms}
            selectedIndexes={selectedBedRoom}
            onPress={(value: any) => {
              if (value.includes(0)) {
                if (value.length == 2) {
                  setSelectedBedRoom(
                    value.filter((item: number) => item !== 0)
                  );
                } else {
                  setSelectedBedRoom([0]);
                }
                return;
              }
              setSelectedBedRoom(value);
            }}
            containerStyle={{ marginBottom: 20 }}
          />
          <Text style={instyles.text} h4>
            Bathrooms
          </Text>
          <ButtonGroup
            selectMultiple={true}
            buttons={bathRooms}
            selectedIndexes={selectedBathRoom}
            onPress={(value) => {
              if (value.includes(0)) {
                if (value.length == 2) {
                  setSelectedBathRoom(
                    value.filter((item: number) => item !== 0)
                  );
                } else {
                  setSelectedBathRoom([0]);
                }
                return;
              }
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
