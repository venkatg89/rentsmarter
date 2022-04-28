import React, { useState, useEffect, useReducer, createContext } from "react";

// styled-components
import styled from "styled-components/native";

// react-navigation

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CalculatorView from "./CalculatorView";
import CalculatorSummaryView from "./CalculatorSummaryView";

import Ionicons from "react-native-vector-icons/Ionicons";

import { createStackNavigator } from "@react-navigation/stack";

import typography from "../../../config/typography";
import { useNavigation } from "@react-navigation/native";
import ExpensesDetailView from "../itemizedexpenses/ExpensesDetailView";
import PayDeductionsView from "../deductions/PayDeductionsView";

import NavTitleCalculator from "../NavTitleCalculator";
import appColors from "../../../config/colors";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import analytics from "@react-native-firebase/analytics";
import { itemizedExpensesReducer } from "./../itemizedexpenses/ExpensesContextReducer";
import {
  StateContext,
  DispatchContext,
} from "./../itemizedexpenses/ExpensesDetailContext";

//import { Share } from "react-native";
import Share from "react-native-share";

import fonts from "../../../config/fonts";
import ShareExample from "./ShareSample";

// import

const initialState = {
  cellphonebilltext: 0,
  cellphonebillslider: 0,
  cellphonebill_editable: false,

  transportationtext: 0,
  transportationslider: 0,
  transportation_editable: false,

  utilitiestext: 0,
  utilitiesslider: 0,
  utilities_editable: false,

  groceriesanddiningtext: 0,
  groceriesanddiningslider: 0,
  groceriesanddining_editable: false,

  insurancetext: 0,
  insuranceslider: 0,
  insurance_editable: false,
  initinsurance: 0,

  subscriptionservicestext: 0,
  subscriptionservicesslider: 0,
  subscriptionservices_editable: false,

  otherexpensestext: 0,
  otherexpensesslider: 0,
  otherexpenses_editable: false,

  monthlyitemizedexpensestext: 0,
  monthlyitemizedexpenseslider: 0,
  monthlyitemizedexpenses_editable: false,

  cv_expensestext: 0,
  cv_expensesslider: 0,
  cv_expenses_editable: false,
};

function CalculatorStackScreen({}) {
  const CalculatorStack = createStackNavigator();

  const [cstate, cdispatch] = useReducer(itemizedExpensesReducer, initialState); //, lazyInit);
  const shareMessage = async () => {
    const options = {
      title: "Sharing!",
      message: "Hello, world, we're sharing messages",
    };

    // const response = await Share.share(options);
  };

  const shareiOSURL = async () => {
    const options = {
      title: "Sharing!",
      url: "https://www.fanniemae.com",
    };

    // const response = await Share.share(options);
  };

  const shareAndroidURL = async () => {
    const options = {
      title: "Sharing!",
      message: "The Fannie Mae URL: " + "https://www.fanniemae.com",
    };

    // const response = await Share.share(options);
  };

  // const shareAndroidFile = async() => {
  //   const options = {
  //     title: 'Affordability Calculations',
  //     message: 'Affordability Calculations/nFebruary 16, 2022',
  //   };

  //   const response = await Share.share(options);

  // }

  const shareMultipleLinesMessage = async () => {
    const options = {
      title: "Sharing!",
      message: "Multiple \nlines message",
    };

    // const response = await Share.share(options);
  };

  const shareOptions = {
    title: "Share via",
    message: "some message",
    url: "some share url",
    social: Share.Social.WHATSAPP,
    whatsAppNum0ber: "9199999999", // country code + phone number
    filename: "test", // only for base64 file in Android
  };

  return (
    <StateContext.Provider value={{ cstate }}>
      <DispatchContext.Provider value={{ cdispatch }}>
        <CalculatorStack.Navigator screenOptions={{ headerShown: true }}>
          <CalculatorStack.Screen
            name="CalculatorStack"
            component={PackageCalcView}
            options={{
              headerTitle: NavTitleCalculator,
              headerRight: () => (
                <ShareButton
                  onPress={() => {
                    //shareAndroidURL()
                    console.log("SHARE.OPEN HAPPENED");
                    Share.open(shareOptions)
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => {
                        err && console.log(err);
                      });
                  }}
                >
                  <EllipsisText>...</EllipsisText>
                </ShareButton>
              ),
            }}
          />
          <CalculatorStack.Screen
            name="Itemized Expenses"
            component={ExpensesDetailView}
          />
          <CalculatorStack.Screen
            name="Pay Deductions"
            component={PayDeductionsView}
          />
        </CalculatorStack.Navigator>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function PackageCalcView() {
  //   let opacity1 = useState(new Animated.Value(1)); // doesn't work
  //   let opacity2 = useRef(new Animated.Value(1)).current;
  //   let opacity3 = useRef(new Animated.Value(0)).current;
  //   let move1 = useRef(new Animated.ValueXY()).current;
  //   // let opacity = new Animated.Value(1);
  //    let scale1 = useRef(new Animated.Value(1)).current;

  //    // for scale:
  //    const animatedStyles = {
  //      transform: [
  //        {
  //          scale: scale1,
  //        }
  //      ]
  //    }

  // look at setting ToolTipView height width to 0 0 on animation completion
  return (
    <Container>
      <CalculatorPagesTabView></CalculatorPagesTabView>
      {/* <ToolTipView></ToolTipView> */}
    </Container>
  );
}

// https://stackoverflow.com/questions/63444247/react-native-top-tab-bar-navigator-indicator-width-to-match-text

function CalculatorPagesTabView() {
  const TabTop = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  const { swipeEnabled, setSwipeEnabled } = useState(false);

  return (
    <TabTop.Navigator
      // tabBarOptions={{
      //   style: {
      //     backgroundColor: "white",
      //     paddingTop: 20,
      //     paddingHorizontal: 25,
      //     height: 20,

      //   },

      //   // indicatorStyle: {

      //   //   borderBottomColor: appColors.fannieBlue,

      //   //   borderBottomWidth: 2,
      //   //   flex:1,
      //   //   left: "9%",
      //   // },
      //   tabStyle: {
      //     justifyContent: "center",
      //     width: "auto",
      //     minHeight: 10,
      //     maxHeight: 20,
      //     height: 20,
      //     paddingBottom: 30,

      //   },
      // }}
      screenOptions={({ route }) => ({
        tabBarPressColor: "white",
        // tabBarStyle: { height: 40},
        tabBarIndicatorStyle: {
          backgroundColor: appColors.fannieBlue,
          height: 3,
        },
        tabBarItemStyle: {
          justifyContent: "center",
        },
        tabBarStyle: {
          backgroundColor: "white",
          // paddingHorizontal: 25,
          height: 40,
        },
        // tabBarActiveTintColor: appColors.rentAmountGreen,
        // tabBarInactiveTintColor: appColors.fannieBlack,
        // tabBarItemStyle: { backgroundColor: "white", height: 40 },
        //  tabBarLabelStyle: { height: 5 },

        //  //tabBarContentContainerStyle: {height: 50},
        // tabBarIcon: ({ focused, color, size }) => {
        //   let iconName: string = "";
        //   // if (route.name === "Calculator") {
        //   //   iconName = focused ? "home" : "home-outline";
        //   // } else if (route.name === "Calculator Summary View") {
        //   //   iconName = focused ? "search" : "search-outline";
        //   // }

        //   return <Ionicons name={iconName} size={size} color={color} />;
        // },
        // other screen options
        headerShown: true,
        swipeEnabled: false,
      })}
    >
      <TabTop.Screen
        name="Open"
        component={CalculatorView}
        initialParams={{ screen: "Calculator" }}
        options={{
          tabBarLabel: ({ focused }) => (
            <LabelView>
              <TabLabelText
                style={{
                  fontFamily: focused
                    ? "SourceSansPro-SemiBold"
                    : "SourceSansPro-Regular",
                  fontSize: 16,
                  fontWeight: focused ? "bold" : "300",
                  color: focused ? appColors.fannieBlue : appColors.fannieBlack,
                }}
              >
                Calculator
              </TabLabelText>
            </LabelView>
          ),
        }}
      />
      <TabTop.Screen
        name="Summary"
        component={CalculatorSummaryView}
        initialParams={{ screen: "Summary" }}
        options={{
          tabBarLabel: ({ focused }) => (
            <LabelView>
              <TabLabelText
                style={{
                  fontFamily: focused
                    ? "SourceSansPro-SemiBold"
                    : "SourceSansPro-Regular",
                  fontSize: 16,
                  fontWeight: focused ? "bold" : "200",
                  color: focused ? appColors.fannieBlue : appColors.fannieBlack,
                }}
              >
                Summary
              </TabLabelText>
            </LabelView>
          ),
        }}
      />
      {/* <TabTop.Screen name="Calculator" 
      
      component={CalculatorView} /> */}
      {/* <TabTop.Screen name="Summary" component={CalculatorSummaryView} /> */}
    </TabTop.Navigator>
  );
}

const LargeTextStyle = typography.largeTextStyle;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export default CalculatorStackScreen;

const SafeArea = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: #f8f6f5;
  align-items: center;
`;

const TabsContainer = styled.View`
  z-index: 40;
  position: absolute;
`;

const LabelView = styled.View`
  flex: 1;
  flex-direction: column;
  margin-bottom: 30px;
  align-items: center;
  width: 200px;
`;

const TabLabelText = styled.Text`
  // width: 200px;
`;

const EllipsisText = styled.Text`
  color: blue;
  font-weight: bold;
  padding-horizontal: 10px;
`;

const ShareButton = styled.TouchableOpacity`
  align-content: space-between;
`;
