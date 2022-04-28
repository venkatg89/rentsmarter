
import {  Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const UtilitiesInfoAlert = () =>
  Alert.alert("Monthly Utilities",  
  "\nExamples include electricity, gas, and water.", [
    
    { text: "Ok, got it!", onPress: () => {

      analytics()
      .logEvent("ItemizedExp_Util_InfoBtn_Press", {
        id: 92000010,
        event: "Utilities Info Alert",
        description: "display the Utilities info alert",
      })
      .catch((err) => console.log(err));
      
    } },
  ]);

export default UtilitiesInfoAlert;
