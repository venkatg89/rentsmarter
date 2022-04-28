 
import {   Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const GrossIncomeInfoAlert = () =>



  Alert.alert("Monthly Gross Income",  
  "\nThis is the before tax income for you. Include all of your monthly income while factoring in taxes, base salary, commissions, bonuses, tips, overtime, alimony, or anything that is considered income to you.", [
    
    { text: "Ok, got it!", onPress: () => {


      analytics()
      .logEvent("Calcultr_MainPg_GrossInc_InfoBtn_Press", {
        id: 80000005,
        event: "GrossIncome Info Alert",
        description: "display the gross income info alert",
      })
      .catch((err) => console.log(err));




  } },
]);

export default GrossIncomeInfoAlert;
