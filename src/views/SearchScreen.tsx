import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import {BaseSearch} from './BaseSearch';
import { useNavigation } from '@react-navigation/native';

interface address {
  zipCode: number;
  formattedText: string;
}

const places = [
  {
    zipCode: 42036,
    formattedText: '42036 Washington, TX',
  },
  {
    zipCode: 42036,
    formattedText: '42036 Fairborn, OH',
  },
  {
    zipCode: 42037,
    formattedText: '42037 Beavercreek, OH',
  },
  {
    zipCode: 42038,
    formattedText: '42038 Denver, CO',
  },
  {
    zipCode: 78744,
    formattedText: 'Austin, TX, 78744, USA',
  },
  {
    zipCode: 20350,
    formattedText: 'Arlington, VA, 20350, USA',
  },
] as address[];

const SearchScreen = (navigate: any) => {
  const navigation = useNavigation();
  const [searchItems, setSearchItems] = useState(() => [] as string[]);
  const [placeItems, SetPlaceItems] = useState(() => [] as address[]);
  const renderPlaceItem = (placeItem: any) => {
    const {formattedText} = placeItem.item as address;
    return (
      <View
      style={[
        {
          padding: 3,
          height: 50,
          borderBottomWidth: 0.5,
          borderColor:'#DEDEDE',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }
      ]}>
      <Image
        source={require('../assets/Images/location.png')}
        style={{width: 12, height: 16, marginRight: 10}}
      />
      <Text
        style={{
          fontSize: 16,
          textAlignVertical: 'center',
          color: '#0A649D',
          marginLeft: 5,
          marginRight: 10,
          // fontFamily: 'Source Sans Pro Regular',
        }}>
        {formattedText || ''}
      </Text>
    </View>
    )
  }

  const renderSearchItem = (searchItem: any) => {
    const {searchText, isShowMore} = searchItem.item;
    return (
      <View
        style={[
          {
            // marginTop:15,
            padding: 3,
            height: 50,
            borderBottomWidth: 0.5,
            borderColor:'#DEDEDE',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          },
          isShowMore && {
            flexDirection: 'row-reverse',
            justifyContent: 'flex-end',
          },
        ]}>
        <Image
          source={
            isShowMore
              ? require('../assets/Images/expand.png')
              : require('../assets/Images/clock.png')
          }
          style={{width: 16, height: 16, marginRight: 10}}
        />
        <Text
          style={{
            fontSize: 16,
            textAlignVertical: 'center',
            color: '#0A649D',
            marginLeft: 5,
            marginRight: 10,
          }}>
          {searchText || ''}
        </Text>
      </View>
    );
  };

  const isValidZipCode = (zipCode: any) => {
    if (isNaN(zipCode) === false) {
      const isValidZipCode = zipCode.trim().length === 5;
      if (isValidZipCode === false) {
        Alert.alert('ZipCode', 'Zip code is not valid.');
        return false;
      }
    }
    return true;
  };

  const setPlaces = (zipCode: any) => {
    if (isNaN(zipCode) === false) {
      const currentPlaces = places.filter(
        place => place.zipCode === parseInt(zipCode),
      );
      SetPlaceItems(currentPlaces);
    } else {
      SetPlaceItems([]);
    }
  };

  const renderHeaderSection = (title: string) => {
    return (
      <View
        style={{
          backgroundColor: '#DEDEDE',
          padding: 10,
          height: 37,
          justifyContent: 'center',
          fontSize: 16,
        }}>
        <Text
          style={{fontSize: 16, textAlignVertical: 'center', color: '#605B57', marginHorizontal: 5}}>
          {title}
        </Text>
      </View>
    );
  }

  return (
    <View style={{backgroundColor: 'white', paddingTop: 15}}>
      <BaseSearch
        key={'SearchContainer'}
        placeholderText={'  Search by City, State or Zip Code'}
        accessibilityLabel={'searchBar'}
        onSearchTextValueChange={(text: string) => {
          if (!isValidZipCode(text)) {
            return;
          }
          setPlaces(text);
          var newItems = [
            {
              searchText: text,
              isShowMore: false,
            },
            ...(searchItems.length > 0
              ? searchItems
              : [
                  {
                    searchText: 'Show More',
                    isShowMore: true,
                  },
                ]),
          ];
          setSearchItems(newItems);
        }}
      />
      <View
        style={{
          marginHorizontal: 10,
          height: 50,
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <Image
          source={require('../assets/Images/pointer.png')}
          style={{width: 17, height: 17}}
        />
        <TouchableWithoutFeedback
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
           navigation.navigate(navigate.navigate)}}>
          <Text
            style={{
              fontSize: 16,
              textAlignVertical: 'center',
              color: '#0A649D',
              marginLeft: 10,
              // fontFamily: 'Source Sans Pro Regular',
            }}>
            {'Use Current Location'}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      {renderHeaderSection('Places')}
      <FlatList
        data={placeItems}
        renderItem={renderPlaceItem}
        keyExtractor={(item: string, index: number) => (index + 1).toString()}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        style={{margin: 10}}
      />
      <View style={{height: 10}}></View>
      {renderHeaderSection('Recent searches')}
      <FlatList
        data={searchItems}
        renderItem={renderSearchItem}
        keyExtractor={(item: string, index: number) => (index + 1).toString()}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        style={{margin: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default SearchScreen;
