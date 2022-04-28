
import {  Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const GroceriesAndDiningInfoAlert = () =>
  Alert.alert("Monthly Groceries and Dining",  
  "\nInclude your best estimate for how much you spend each month on groceries and dining.", [
    
    { text: "Ok, got it!", onPress: () => {

      analytics()
      .logEvent("ItemizedExp_GroAndDine_InfoBtn_Press", {
        id: 92000001,
        event: "Groceries And Dining Info Alert",
        description: "display the groceries and dining info alert",
      })
      .catch((err) => console.log(err));


    } },
  ]);

export default GroceriesAndDiningInfoAlert;
