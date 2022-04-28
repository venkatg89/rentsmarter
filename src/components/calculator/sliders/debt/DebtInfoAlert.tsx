
import { Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const DebtInfoAlert = () =>


  Alert.alert("Monthly Debt",  
  "\nYour minimum monthly payments for debt such as student loans, car payments, or credit cards.", [
    
    { text: "Ok, got it!", onPress: () => {


      analytics()
            .logEvent("Calcultr_MainPg_Debt_InfoBtn_Press", {
              id: 80000002,
              event: "Debt Info Alert",
              description: "display the debt info alert",
            })
            .catch((err) => console.log(err));



  } },
]);

export default DebtInfoAlert;
