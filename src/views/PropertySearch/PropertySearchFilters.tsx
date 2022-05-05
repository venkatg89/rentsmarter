import React, { useState, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./PropertySearchStyles";
import { ButtonGroup, Input, Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import SelectDropdown from "react-native-select-dropdown";
import { Slider } from "@miblanchard/react-native-slider";
import Fonts from "../../Themes/Fonts";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

type props = {};

const bedRooms = ["Any", "Studio", "1", "2", "3", "4", "5+"];
const bathRooms = ["Any", "1", "2", "3+"];
const Item = Picker.Item;

const MIN = 500;

const PropertySearchFilters: React.FC<props> = ({}) => {
  const navigation = useNavigation();

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => {}}>
        <Text style={{ color: "#0096FF" }}>{"Reset"}</Text>
      </TouchableOpacity>
    ),
  });

  const [selectedBedRoom, setSelectedBedRoom] = useState([]);
  const [selectedBathRoom, setSelectedBathRoom] = useState([]);
  const [selectedMinSquareFeet, setSelectedMinSquareFeet] = useState("500");
  const [selectedMaxSquareFeet, setSelectedMaxSquareFeet] = useState("2000");
  const [selectedMonthlyRent, setSelectedMonthlyRent] = useState([400, 800]);

  const minAndMaxValues = () => {
    return Array.from(Array(16).keys()).map((current, i) => {
      return MIN + current * 100;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={[
                instyles.text,
                {
                  flex: 0.5,
                  alignSelf: "center",
                },
              ]}
            >
              Montly Rent
            </Text>
            <Input
              containerStyle={[{ flex: 0.3 }, instyles.textInputStyleClass]}
              placeholder="Min Rent"
              leftIcon={{ type: "font-awesome", name: "dollar", size: 20 }}
              onChangeText={(number) => {
                setSelectedMonthlyRent((prevState) => [
                  Number(number),
                  prevState[1],
                ]);
              }}
              value={selectedMonthlyRent[0].toString()}
              underlineColorAndroid="transparent"
              textAlignVertical={"center"}
              textAlign={"right"}
              inputContainerStyle={[{ borderBottomWidth: 0 }]}
            />
            <Text
              style={[
                {
                  flex: 0.1,
                  alignSelf: "center",
                  textAlign: "center",
                },
              ]}
              h4
            >
              -
            </Text>
            <Input
              containerStyle={[{ flex: 0.3 }, instyles.textInputStyleClass]}
              onChangeText={(number) => {
                setSelectedMonthlyRent((prevState) => [
                  prevState[0],
                  Number(number),
                ]);
              }}
              placeholder="Max Rent"
              leftIcon={{ type: "font-awesome", name: "dollar", size: 20 }}
              value={
                selectedMonthlyRent.length > 0
                  ? `${selectedMonthlyRent[1]}`
                  : ""
              }
              underlineColorAndroid="transparent"
              textAlignVertical={"center"}
              textAlign={"right"}
              inputContainerStyle={[{ borderBottomWidth: 0 }]}
            />
          </View>
          {/* <SliderContainer
            caption="<Slider/> with custom style"
            sliderValue={[400, 800]}
          > */}
          <Slider
            containerStyle={{ marginHorizontal: 10 }}
            animateTransitions
            maximumValue={2000}
            minimumValue={0}
            value={selectedMonthlyRent}
            step={10}
            thumbTintColor="#2089dc"
            onValueChange={(value) => {
              console.log(".....", value);
              setSelectedMonthlyRent(value);
            }}
          />
          <Divider style={{ height: 3 }} />
          {/* </SliderContainer> */}
          <Text
            style={[
              instyles.text,
              { marginHorizontal: 10, marginVertical: 10 },
            ]}
          >
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
          <Divider style={{ height: 3 }} />
          <Text
            style={[
              instyles.text,
              { marginHorizontal: 10, marginVertical: 10 },
            ]}
          >
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
          <Text
            style={[
              instyles.text,
              { marginHorizontal: 10, marginVertical: 10 },
            ]}
          >
            Squarefeet
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={{ textAlign: "center", textAlignVertical: "center" }}
              >
                {"Minimum"}
              </Text>
              {/* <Picker
                selectedValue={selectedMinSquareFeet}
                onValueChange={(v) => setSelectedMinSquareFeet(v)}
                mode={'dropdown'}
              >
                {minAndMaxValues().map((value) => (
                  <Item label={value.toString()} value={value} />
                ))}
              </Picker> */}
              <View style={{ paddingVertical: 10 }}>
                <SelectDropdown
                  data={minAndMaxValues()}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setSelectedMinSquareFeet(selectedItem);
                  }}
                  defaultButtonText={"Select"}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={{
                    width: 160,
                    height: 40,
                    backgroundColor: "#FFF",
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: "#444",
                  }}
                  dropdownStyle={{ height: 200 }}
                  renderDropdownIcon={() => {
                    return (
                      <Image
                        source={require("../../assets/Images/expand.png")}
                        style={{ width: 12, height: 12, marginRight: 10 }}
                      />
                    );
                  }}
                />
              </View>
            </View>
            {/* <View style={{ flex: 0.2 }} /> */}
            <View style={{ width: "30%" }}>
              <Text
                style={{ textAlign: "center", textAlignVertical: "center" }}
              >
                {"Maximum"}
              </Text>
              {/* <Picker
                selectedValue={selectedMaxSquareFeet}
                onValueChange={(v) => setSelectedMaxSquareFeet(v)}
              >
                {minAndMaxValues().map((value) => (
                  <Item label={value.toString()} value={value} />
                ))}
              </Picker> */}
              <View style={{ paddingVertical: 10 }}>
                <SelectDropdown
                  data={minAndMaxValues()}
                  onSelect={(selectedItem, index) => {
                    setSelectedMaxSquareFeet(selectedItem);
                  }}
                  defaultButtonText={"Select"}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                  buttonStyle={{
                    width: 160,
                    height: 40,
                    backgroundColor: "#FFF",
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: "#444",
                  }}
                  dropdownStyle={{ height: 200 }}
                  renderDropdownIcon={() => {
                    return (
                      <Image
                        source={require("../../assets/Images/expand.png")}
                        style={{ width: 12, height: 12, marginRight: 10 }}
                      />
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const instyles = StyleSheet.create({
  text: {
    fontSize: Fonts.size.medium,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "700",
  },
  textInputStyleClass: {
    // Setting up Hint Align center.
    textAlign: "right",

    // Setting up TextInput height as 50 pixel.
    height: 45,

    // Set border width.
    borderWidth: 0.5,

    // Set border Hex Color Code Here.
    borderColor: "gray",

    // Set border Radius.
    borderRadius: 5,

    //Set background color of Text Input.
    backgroundColor: "#FFFFFF",
  },
});

export default PropertySearchFilters;
