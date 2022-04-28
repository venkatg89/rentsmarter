// import React, { useState } from "react";
import {  Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const ArcInfoAlert = () =>


  Alert.alert("How Do We Calculate", 
  "\nSuggested Rent = Income * (% of income)\n\nGross Income is most often used in order to provide the most accurate calculation. Use the sliders below to input your gross income, amount you want to allocate to rent, deductions, debt, etc.\n\nWhen finished, you will see the remaining amount of your income, along with a visualization of how your budget is allocated.", [
    
    { text: "Ok, got it!", onPress: () => {


      
      analytics()
      .logEvent("Calcultr_MainPg_Arc_InfoButton_Press", {
        id: 80000001,
        event: "Arc Info Alert",
        description: "display the arc info alert",
      })
      .catch((err) => console.log(err));
    



  } },
]);

export default ArcInfoAlert;
