import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  EdgeInsetsPropType,
  Pressable,
} from "react-native";
import styles from "./PropertySearchStyles";
import Fonts from "../../Themes/Fonts";
// import { RadioButton } from 'react-native-paper';
import RadioButtonRN from "radio-buttons-react-native";
import RadioButton from "react-native-radio-button";

const { width } = Dimensions.get("window");

type props = {
  ShowFilterModal: () => void | undefined;
  onChange: (category: string) => void;
  toHigh: boolean;
  setToHeigh: (value: boolean) => void;
  defaultFilter: string;
};

const Filter: React.FC<props> = ({
  ShowFilterModal,
  onChange,
  toHigh,
  setToHeigh,
  defaultFilter,
}) => {
  const filters = ["price", "bedrooms", "bathrooms", "square_feet"];
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);

  const onRadioButtonPress = (filterName: string) => {
    setSelectedFilter(filterName);
    onChange(filterName);
  };

  return (
    <View
      style={{
        height: "38%",
        backgroundColor: "#FFFFFF",
        position: "absolute",
        // padding: 20,
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 14,
          paddingHorizontal: 16,
          backgroundColor: "#f6f6f6",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          onPress={() => setToHeigh(!toHigh)}
        >
          <Image
            source={require("../../assets/Images/expand.png")}
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
            }}
          />
          <Text style={[styles.planText, { marginHorizontal: 5 }]}>
            {toHigh ? "Low to High" : "High to Low"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.filTerTitle}>Sort by</Text>
        <Text onPress={ShowFilterModal} style={styles.resetText}>
          Done
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignContent: "center",
          paddingHorizontal: 20,
          paddingVertical: 6,
        }}
      >
        <Pressable
          onPress={() => {
            onRadioButtonPress("price");
          }}
        >
          <View style={styles.filterItem}>
            <Text>Price</Text>
            <RadioButton
              animation={"bounceIn"}
              isSelected={selectedFilter === "price"}
              onPress={() => onRadioButtonPress("price")}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            onRadioButtonPress("bedrooms");
          }}
        >
          <View style={styles.filterItem}>
            <Text>Bedrooms</Text>
            <RadioButton
              animation={"bounceIn"}
              isSelected={selectedFilter === "bedrooms"}
              onPress={() => onRadioButtonPress("bedrooms")}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            onRadioButtonPress("bathrooms");
          }}
        >
          <View style={styles.filterItem}>
            <Text>Bathrooms</Text>
            <RadioButton
              animation={"bounceIn"}
              isSelected={selectedFilter === "bathrooms"}
              onPress={() => onRadioButtonPress("bathrooms")}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            onRadioButtonPress("square_feet");
          }}
        >
          <View style={styles.filterItem}>
            <Text>Square Feet</Text>
            <RadioButton
              animation={"bounceIn"}
              isSelected={selectedFilter === "square_feet"}
              onPress={() => onRadioButtonPress("square_feet")}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Filter;
