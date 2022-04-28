import React, { useState, useEffect } from "react";

// styled-components
import styled from "styled-components/native";

// react-navigation
import { createStackNavigator } from "@react-navigation/stack";

// application
// import HomeScrollView from "../components/home/HomeScrollView";
import NavTitleHome from "../components/home/NavTitleHome";
// import HomeTopContent from "../components/home/HomeTopContent";
import { useNavigation } from "@react-navigation/native";
import appColors from "../config/colors";
import typography from "../config/typography";

import HomeCell from "../components/home/HomeCell";

import Terms from "../components/settings/TermsOfUse";

import PrivacyNotice from "../components/settings/PrivacyNotice";
// react-native
import {
  Text,
  Dimensions,
  Modal,
  Alert,
  Pressable,
  View,
  StyleSheet,
  Linking,
} from "react-native";

import useNestedModals, {
  INestedModalsContext,
} from "react-native-nested-modals";
import ModalA from "./modals/ModalA";
import ModalB from "./modals/ModalB";
import { ScrollView } from "react-native-gesture-handler";
import analytics from "@react-native-firebase/analytics";
import { NavigationContainer } from "@react-navigation/native";

const HomeStack = createStackNavigator();

function HomeStackScreen({}) {
  // const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height;
  const [modalVisible, setModalVisible] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const { openModal, closeModal }: INestedModalsContext = useNestedModals();

  useEffect(() => {
    analytics().logEvent("Homescreen_MainPage_Arrived", {
      id: 20000004,
      event: "homescreen page - top level",
      description: ["arrived on homescreen page"],
    });
  }, []);

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: true }}>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          headerTitle: NavTitleHome,
          headerRight: () => (
            <HomeButton
              onPress={() => {
                let newModalAIdx = openModal(<ModalA />, {
                  style: { margin: 10 },
                });
                //console.log({ newModalAIdx });
              }}
            >
              <EllipsisText>...</EllipsisText>
            </HomeButton>
          ),
          // headerRight: () => (
          //   <HomeButton onPress={() => setModalVisible(!modalVisible)}>
          //     <EllipsisText>...</EllipsisText>
          //   </HomeButton>
          // ),
        }}
      />
      <HomeStack.Screen name="Privacy" component={PrivacyNotice} />
    </HomeStack.Navigator>
  );

  // 'this.showSettings' in 'OnPress' was causing Android not to work
  function HomeScreen() {
    let navigation = useNavigation();

    return (
      <HomeView>
        {/* <HomeTopContent /> */}
        {/* <HomeScrollView /> */}

        <TopContentContainer>
          <CovidReliefLink
            onPress={() => {
              analytics().logEvent("Homescreen_MainPage_CovidLink_Press", {
                id: 50000002,
                event: "covid 19 link pressed",
                description: ["go to covid 19 information"],
              });
              Linking.openURL("https://www.fanniemae.com/here-help-renters");
            }}
          >
            <CovidReliefText>COVID-19 renter relief</CovidReliefText>
          </CovidReliefLink>
          <CovidSmallView>
            <CovidReliefTextSmall>
              Find out about resources to help{" "}
            </CovidReliefTextSmall>
            <CovidReliefTextSmall>
              during these challenging times
            </CovidReliefTextSmall>

            <CovidReliefTextSmall> </CovidReliefTextSmall>
          </CovidSmallView>

          <ContentBackground
            source={require("../../assets/Home-Image.png")}
          ></ContentBackground>
        </TopContentContainer>

        <ViewContainer>
          <CardsScrollView>
            <HomeCell
              image={require("../../assets/Property-Card.png")}
              navigate="Property"
              header="Find your rental"
              description="Let our property search help you find the right property in your journey."
            />
            <HomeCell
              image={require("../../assets/Calculator-Card.png")}
              navigate="Calculator"
              header="See what you can afford"
              description="Use our rent calculator to see how much you can afford to spend on rent!"
            />
            <HomeCell
              image={require("../../assets/Checklist-Card.png")}
              navigate="Checklist"
              header="Things to know before you rent"
              description="We put together a renter checklist outlining the major items to keep in mind as you prepare for your next move."
            />
            <HomeCell
              image={require("../../assets/VA-Card.png")}
              navigate="Assistant"
              header="Get a helping hand"
              description="Our Virtual Assistant is here to help answer your questions and guide you in your path forward."
            />

            <HowDoWeUseThisInfoButton
              onPress={() => {
                analytics().logEvent(
                  "Homescreen_MainPage_HowWeUseInf_LnkPress",
                  {
                    id: 50000003,
                    event: "how do we use this information",
                    description: ["reading how do we use this information"],
                  }
                );

                navigation.navigate("Privacy");
              }}
            >
              <InfoText>How do we use this information?</InfoText>
            </HowDoWeUseThisInfoButton>
          </CardsScrollView>
        </ViewContainer>
      </HomeView>
    );
  }
}

export default HomeStackScreen;

const CovidSmallView = styled.View`
  align-items: center;
  background-color: #0a649d;
`;

const HomeView = styled.View`
  flex: 1;
`;

const HomeButton = styled.TouchableOpacity`
  align-content: space-between;
`;

const EllipsisText = styled.Text`
  color: blue;
  font-weight: bold;
  padding-horizontal: 10px;
`;
const Spacer = styled.View`
  flex: 1;
`;
const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
  flex: 1;
`;

const InfoText = styled.Text`
  color: ${appColors.fannieBlue};
  font-size: 16px;
`;

const HowDoWeUseThisInfoButton = styled.TouchableOpacity`
  height: 40px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const CardsScrollView = styled.ScrollView`
  margin-top: 20px;
  /* flex-grow: 1;
height: 1200px; */
`;

const CovidReliefText = styled.Text`
  color: white;
  font-size: 16px;
  text-decoration: underline;
`;

const CovidReliefTextSmall = styled(typography.smallTextStyle)`
  color: white;
  background-color: #0a649d;
`;

const CovidReliefLink = styled.TouchableOpacity`
  height: 40px;
  background-color: #0a649d;
  justify-content: center;
  align-items: center;
`;

const TopContentContainer = styled.View`
  justify-content: center;
`;
const ContentBackground = styled.ImageBackground`
  height: 100px;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;
