
import {  Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const CellPhoneBillInfoAlert = () =>
  Alert.alert("Monthly Cellphone Bill",  
  "\nThis is the monthly fee for your mobile devices", [
    
    { text: "Ok, got it!", onPress: () => {


      analytics()
      .logEvent("ItemizedExp_CellPho_InfoBtn_Press", {
        id: 92000002,
        event: "Cell Phone Bill Info Alert",
        description: "display the cell phone bill info alert",
      })
      .catch((err) => console.log(err));


    } },
  ]);

export default CellPhoneBillInfoAlert;
