// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {ReactNode} from 'react';

// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useRoute } from '@react-navigation/@native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 

// import { createStackNavigator } from '@react-navigation/stack';


// import Ionicons from 'react-native-vector-icons/Ionicons';

// import HomeStackScreen from './src/views/HomeScreen';
// import CalculatorScreen from "./src/views/CalculatorScreen";
// import ChecklistScreen from "./src/views/ChecklistScreen";
// import AssistantScreen from "./src/views/AssistantScreen";
// import PropertySearch from "./src/views/PropertySearch";


// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Animated,
//   TouchableOpacity,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// /////////////////////////////

// const Tab = createMaterialTopTabNavigator();

// export default function AppMaterial() {
//     return (
//       <NavigationContainer>
//           <Tab.Navigator 
//           tabBar={props => <MyTabBar {...props} />}>
//             <Tab.Screen name="Calculator" component={CalculatorScreen}   />
//             <Tab.Screen name="PropertySearch" component={PropertySearch}   />
//         </Tab.Navigator>
//       </NavigationContainer>
//     )
// }

 

// function MyTabBar({ state, descriptors, navigation, position }) {
//   return (
//     <View  style={{ flexDirection: 'row' }}>
//       {state.routes.map((route, index) => {

        
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             // The `merge: true` option makes sure that the params inside the tab screen are preserved
//             navigation.navigate({ name: route.name, merge: true });
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         const inputRange = state.routes.map((_, i) => i);
//         const opacity = position.interpolate({
//           inputRange,
//           outputRange: inputRange.map(i => (i === index ? 1 : 0)),
//         });

//         return (
//           <TouchableOpacity
//             key={index} // mpi i had to add this
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Animated.Text style={{ opacity }}>
//               {label}
//             </Animated.Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

  
  

 
