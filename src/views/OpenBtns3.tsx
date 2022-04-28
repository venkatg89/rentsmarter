import React, { ComponentType } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import useNestedModals, {
  INestedModalsContext,
} from 'react-native-nested-modals';
import appColors from '../config/colors';

export default function OpenBtns3() {
  const { openModal, closeModal }: INestedModalsContext = useNestedModals();
  return (
    <View style={styles.container}>
 
     <Btn backgroundColor={appColors.fannieBlue} text={"close"} onPress={closeModal} />
    </View>
  );
}

const Btn: ComponentType<{
  backgroundColor: string;
  text: string;
  onPress: () => void;
}> = ({ backgroundColor, text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { backgroundColor }]}
    >
      <Text style={styles.btnTxt}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  btn: { borderRadius: 15, height: 50, width: 200, margin: 10 },
  btnTxt: { textAlign: 'center', padding: 15, color: "white" },
});
