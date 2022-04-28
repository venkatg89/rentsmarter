import React, { ComponentType } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import useNestedModals, {
  INestedModalsContext,
} from 'react-native-nested-modals';
import ModalA from './modals/ModalA';
 

export default function OpenBtns() {
  const { openModal, closeModal }: INestedModalsContext = useNestedModals();
  return (
    <View style={styles.container}>
      <Btn
        backgroundColor={'green'}
        text={'open modal a'}
        onPress={() => {
          let newModalAIdx = openModal(<ModalA />, {
            style: { margin: 10 },
          });
          //console.log({ newModalAIdx });
        }}
      />
 
       
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
  btn: { borderRadius: 15, height: 80, width: 80, margin: 20 },
  btnTxt: { textAlign: 'center', padding: 15 },
});
