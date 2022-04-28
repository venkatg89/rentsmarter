 
import {  Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const DeductionsInfoAlert = () =>

  Alert.alert("Monthly Pay Deductions",  
  "\nPayroll deductions are wages withheld from an employee's total earnings for the purpose of paying taxes, garnishments and benefits, like health insurance."  , [
    
    { text: "Ok, got it!", onPress: () => {


      analytics().logEvent("Calcultr_MainPg_Deduct_InfoBtn_Press", {
        id: 80000003,
        event: "Deductions Info Alert",
        description: "display the deductions info alert",
      })
      .catch((err) => console.log(err));


  } },
]);

export default DeductionsInfoAlert;
