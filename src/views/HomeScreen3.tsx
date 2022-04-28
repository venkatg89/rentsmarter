import React from 'react';
import { StyleSheet, View,  Text } from 'react-native';
 

import OpenBtns from './OpenBtns';



const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Nested Modals</Text>
        <OpenBtns />
      </View>
    );
  };

  export default HomeScreen;
  
  const styles = StyleSheet.create({
    container: { flexDirection: 'row' },
    btn: { borderRadius: 15, height: 80, width: 80, margin: 20 },
    btnTxt: { textAlign: 'center', padding: 15 },
  });
  