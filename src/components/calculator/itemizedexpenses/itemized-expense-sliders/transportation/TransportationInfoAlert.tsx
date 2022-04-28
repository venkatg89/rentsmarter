 
import {Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const TransportationInfoAlert = () =>
  Alert.alert("Monthly Transportation",  
  "\nDo you pay for parking, or take mass transit? Add that here.", [
    
    { text: "Ok, got it!", onPress: () => {

      analytics()
      .logEvent("ItemizedExp_Transpo_InfoBtn_Press", {
        id: 92000009,
        event: "Transportation Info Alert",
        description: "display the Transportation info alert",
      })
      .catch((err) => console.log(err));


    } },
  ]);

export default TransportationInfoAlert;
