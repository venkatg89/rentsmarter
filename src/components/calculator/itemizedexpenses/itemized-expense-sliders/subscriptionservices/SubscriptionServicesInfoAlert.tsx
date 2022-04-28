
import {  Alert } from "react-native";
import analytics from '@react-native-firebase/analytics'

const SubscriptionServicesInfoAlert = () =>
  Alert.alert("Monthly Pay Subscription Services",  
  "\nDo you pay for internet, cable television, or streaming services? Add that here."  , [
    
    { text: "Ok, got it!", onPress: () => {

      analytics()
      .logEvent("ItemizedExp_Subscription_InfoBtn_Press", {
        id: 92000008,
        event: "SubscriptionServices Info Alert",
        description: "display the SubscriptionServices info alert",
      })
      .catch((err) => console.log(err));


    } },
  ]);

export default SubscriptionServicesInfoAlert;
