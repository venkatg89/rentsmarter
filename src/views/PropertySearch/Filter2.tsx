import React from "react"; 
import {
    View,
    SafeAreaView,
    Platform,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image
} from "react-native";
import styles from './PropertySearchStyles';
import Fonts from '../../Themes/Fonts';
const { width } = Dimensions.get('window');

type props = { ShowFilterModal: () => void | undefined }

const Filter: React.FC<props> = ({ ShowFilterModal }) => {

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
        }}>
            <View style={{ flex: 0.08, flexDirection: 'row', justifyContent: 'space-between', marginTop: 60, marginLeft:10, marginRight: 10,}}>
                <TouchableOpacity onPress={() => ShowFilterModal()} style = {{ }}>
                    <Image source={require('../../assets/Images/close.png')} style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
                <Text style={styles.filTerTitle}>Property Search Filters</Text>
                <Text style={styles.resetText}>Reset</Text>
            </View>
            <View style ={{ borderTopWidth:3, borderColor: '#F2F2F2'}}/>
            <View style={{ flex: 0.9, alignContent: 'center', marginTop: 200, }}>
                <Text style={{
                    textAlign: 'center', 
                    fontFamily: Fonts.type.semiboldText,
                    fontSize: Fonts.size.h5,
                    fontWeight:'bold',
                    color: "#085280",
                }}> No Data</Text>
            </View>
        </View>
    );
};

export default Filter;
