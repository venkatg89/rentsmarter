/**
 * @format
 */

 import { AppRegistry } from "react-native";
 import React, { useState, useEffect, useContext, createContext } from "react";
 import App from "./App";
 import { name as appName } from "./app.json";
 
 import { Provider as PaperProvider } from "react-native-paper";
 import { Provider as StoreProvider } from "react-redux";
 import { PersistGate } from "redux-persist/integration/react";
 import { ModalsProvider } from "react-native-nested-modals";
 import { ModalPortal } from 'react-native-modals';
 import { firebase } from "@react-native-firebase/analytics";
 import analytics from "@react-native-firebase/analytics";
 
 import configurePersistentStore from "./src/redux/store/configurePersistentStore";
 
 const { store, persistor } = configurePersistentStore();
 
 export const AnalyticsContext = createContext();
 
 function RNRedux() {
   const [collections, setCollections] = useState();
   const [instance, setInstance] = useState();
   const [enabled, setEnabled] = useState();
 
 
    async function upAnalytics() {
      
        //  analytics().setAnalyticsCollectionEnabled(true)
        // .then( response => console.log(" #001 see the json ", response.json()))
        // .catch((err) => console.log("#004 error", err))

        // let thisID =  analytics().getAppInstanceId()
        // .then( response => console.log(" #006 see the id ", response.json()))
        // .catch((err) => console.log("#007 error", err))

        // let thisthing =  analytics();
        // console.log("#008 thisthing", String(thisthing));

        // console.log("show thisID ", thisID)
      
    //  setInstance(await analytics().getAppInstanceId());
    //  console.log("#005 instance id", instance);

        // analytics().setAnalyticsCollectionEnabled(true)
        // .then( response => console.log(" #001 see the json ", response.json()))
        // .catch((err) => console.log("#004 error", err))

     

   }
 
   useEffect(() => {
     upAnalytics();
   }, []);
 
   return (
     <StoreProvider store={store}>
       <PersistGate loading={null} persistor={persistor}>
         <PaperProvider>
           <ModalsProvider>
             <AnalyticsContext.Provider value={{collections: collections, instance: instance}}>
               <App />
             </AnalyticsContext.Provider>
             <ModalPortal />
           </ModalsProvider>
         </PaperProvider>
       </PersistGate>
     </StoreProvider>
   );
 }
 
 AppRegistry.registerComponent(appName, () => RNRedux);
 