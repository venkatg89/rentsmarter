import axios from 'axios';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';

import search from "../assets/Images/search.png";

const API_KEY = 'AIzaSyDkdzVdCEanQ4fZLHGNxzI7ofl992gEISs';
export interface BaseSearchProps {
  searchCriteria: string | string[];
  placeholderText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  textAccessibilityLabel?: string;
  textInputContainerStyle?: StyleProp<ViewStyle>;
  onSearchTextValueChange?: (value: string) => void;
}

/**
 * State for BaseSearch component
 * @param {string} searchText - To maintain the text entered in search field
 */
export interface BaseSearchState {
  searchText: string;
  searchKeyword: string;
  searchResults: string[];
  isShowingResults: boolean;
  isFocused: boolean;
}
/**
 * This is the BaseSearch component. Use this to get filtered data based the text entered.
 */
export class BaseSearch extends Component<BaseSearchProps, BaseSearchState> {
  /**
   * Sets Default Props
   */
  static defaultProps: Partial<BaseSearchProps> = {
    searchCriteria: '',
    accessibilityLabel: 'SearchAction',
    textAccessibilityLabel: 'SearchInput',
  };

  /**
   * Constructor for the BaseSearch class
   * @param {BaseSearchProps} props - Defined props passed as parameters
   */
  constructor(props: BaseSearchProps) {
    super(props);
    this.state = {
      searchText: '',
      searchKeyword: '',
      searchResults: [],
      isShowingResults: false,
      isFocused: false
    };
  }

  searchLocation = async (text: any) => {
    this.setState({searchKeyword: text});
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${this.state.searchKeyword}`,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          searchResults: response.data.predictions,
          isShowingResults: true,
        });
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  render() {
    const {placeholderText, accessibilityLabel, textAccessibilityLabel} =
      this.props;
    const {searchText,searchKeyword,searchResults,isShowingResults, isFocused} = this.state;
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View
          style={[
            styles.textInputContainer,
            this.props.textInputContainerStyle,
          ]}>
          <View style={{ width: "80%"}}>
            <Image source={search} style={{ height: 20, width: 20, position: "absolute", top: 10, left: 10 }} />
            <TextInput
              style={styles.textInput}
              value={this.state.searchKeyword}
              onChangeText={(text) => this.searchLocation(text)}
              onFocus={() => {this.setState({isFocused: true})}}
              onBlur={() => {this.setState({isShowingResults: false})}}
              placeholder={placeholderText || 'search'}
              accessibilityLabel={textAccessibilityLabel}
              returnKeyType={'search'}
              onSubmitEditing={() => {
                this.setState({isShowingResults: false});
                if (this.state.searchKeyword !== '') {
                  this.props.onSearchTextValueChange &&
                    this.props.onSearchTextValueChange(this.state.searchKeyword);
                }
              }}
            />
            {this.state.isShowingResults && (
              <FlatList
                keyboardShouldPersistTaps='always'
                data={this.state.searchResults}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={styles.resultItem}
                      onPress={() =>
                        this.setState({
                          searchKeyword: item.description,
                          isShowingResults: false,
                        })
                      }
                      > 
                      <Text>{item.description}</Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id}
                style={styles.searchResultsContainer}
              />
            )}
          </View>
          <TouchableWithoutFeedback
            accessibilityLabel={accessibilityLabel}
            onPress={() => {
              this.setState({searchText: ''});
            }}>
            <Text
              style={{
                fontSize: 16,
                textAlignVertical: 'center',
                color: '#0096FF',
                margin: 10,
              }}>
              {'Cancel'}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // flex: 0.8,
    maxHeight: 54,
  },
  baseTextInputContainerStyle: {
    flex: 1,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 35,
  },
  searchResultsContainer: {
    width: 340,
    height: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
    zIndex: 1000
  },
  resultItem: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
};
