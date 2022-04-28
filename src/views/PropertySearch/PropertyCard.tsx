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
} from "react-native";
import styles from "./PropertySearchStyles";
import { RNCarousel } from "react-native-carousel-cards";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Fonts from "../../Themes/Fonts";
const { width } = Dimensions.get("window");

type props = {
  listData: any | undefined;
  marginVertical: number | undefined;
  OnSavePropertyClick: (
    listingId: string,
    saveProperty: boolean
  ) => void | undefined;
};

const PropertyCard: React.FC<props> = ({
  listData,
  marginVertical,
  OnSavePropertyClick,
}) => {
  const [saveProperty, setSaveProperty] = useState(false);
  let imageData = [];
  if (listData?.Media.length > 0) {
    {
      listData &&
        listData.Media &&
        listData.Media.map((item: { MediaURL: any }, index: any) => {
          imageData.push({
            url: item?.MediaURL ?? "",
          });
        });
    }
  }
  const data = [
    {
      url: "https://lh.rdcpix.com/c4271c32b9b060b180032cd6143b3a4cl-f821897428r.jpg",
    },
    {
      url: "https://lh.rdcpix.com/cda5a37290f49086993d801857371591l-f1866243452r.jpg",
    },
    {
      url: "https://lh.rdcpix.com/cda5a37290f49086993d801857371591l-f3207310507r.jpg",
    },
    {
      url: "https://lh.rdcpix.com/cda5a37290f49086993d801857371591l-f1784959129r.jpg",
    },
    {
      url: "https://lh.rdcpix.com/cda5a37290f49086993d801857371591l-f285818727r.jpg",
    },
    {
      url: "https://lh.rdcpix.com/cda5a37290f49086993d801857371591l-f1126551280r.jpg",
    },
  ];

  return (
    <View
      style={{
        alignSelf: "center",
        // position: 'absolute',
        // bottom: 0
        marginVertical: marginVertical ? marginVertical : 0,
      }}
    >
      <View
        style={{
          borderWidth: marginVertical ? 0.3 : 0,
          backgroundColor: "#FFFFFF",
          borderRadius: 15,
          borderBottomRightRadius: marginVertical ? 15 : 0,
          borderBottomLeftRadius: marginVertical ? 15 : 0,
        }}
      >
        <View
          style={{
            margin: marginVertical ? 15 : 5,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderWidth: 0.3,
          }}
        >
          <RNCarousel
            data={data}
            loop={true}
            showArrows={false}
            // indicatorBorderColor={'white'}
            indicatorActiveBackgroundColor={"#FCB143"}
            indicatorStyle={{ backgroundColor: "#FFFFFF" }}
            indicatorContainerStyle={styles.indicatorStyle}
          ></RNCarousel>
        </View>
        <View
          style={{
            right: 0,
            left: Platform.OS === "ios" ? 280 : 300,
            bottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSaveProperty(!saveProperty);
              OnSavePropertyClick(listData.ListingId, !saveProperty);
            }}
          >
            {saveProperty ? (
              <Image
                source={require("../../assets/Images/active.png")}
                style={{
                  resizeMode: "cover",
                  width: 50,
                  height: 50,
                  borderRadius: 50 / 2,
                }}
              />
            ) : (
              <Image
                source={require("../../assets/Images/Inactive.png")}
                style={{
                  resizeMode: "cover",
                  width: 50,
                  height: 50,
                  borderRadius: 50 / 2,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              marginLeft: marginVertical ? 30 : 15,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.type.regularText,
                fontSize: Fonts.size.h6,
                letterSpacing: 0,
                fontWeight: "400",
                color: "#121212",
                marginTop: 10,
              }}
            >
              ${listData?.ListPrice ?? "1,409"}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.type.regularText,
                fontSize: Fonts.size.h4,
                letterSpacing: 0,
                fontWeight: "400",
                color: "#085280",
                marginTop: 10,
              }}
            >
              {listData?.ListOfficeName ?? ""}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.type.regularText,
                fontSize: Fonts.size.h6,
                letterSpacing: 0,
                fontWeight: "400",
                color: "#121212",
                marginTop: 10,
              }}
            >
              {listData?.UnparsedAddress ?? ""}, {listData?.PostalCity ?? ""},{" "}
              {listData?.StateOrProvince ?? ""}, {listData?.PostalCode ?? ""}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: marginVertical ? 30 : 15,
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Text style={styles.planText}>Plan E2 | </Text>
            <Text style={styles.planText}>
              {listData?.BedroomsTotal ?? ""} Beds |{" "}
            </Text>
            <Text style={styles.planText}>
              {listData?.BathroomsTotalInteger ?? ""} Baths |{" "}
            </Text>
            <Text style={styles.planText}> 917sqft</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PropertyCard;
