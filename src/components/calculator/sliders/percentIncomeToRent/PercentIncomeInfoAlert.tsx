
import {  Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const PercentIncomeInfoAlert = () =>

  Alert.alert("% of Income",  
  "\nWhy 30% income as default?\n\nAllocating% of your income to rent is generally considered the \"golden rule\". However, we understand that this may vary based on location, so keep in mind that allocating more or less to rent will affect other areas of your budget."
  , [
    
    { text: "Ok, got it!", onPress: () => {


      
        analytics().logEvent("Calcultr_MainPg_Percnt_InfoBtn_Press", {
          id: 80000006,
          event: "Percent Income Info Alert",
          description: "display the percent income alert",
        })
        .catch((err) => console.log(err))
        console.log('percent income alert')
      



    } },
  ]);

export default PercentIncomeInfoAlert;
