import React, { Component } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from "react-native";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import analytics from "@react-native-firebase/analytics";

function ChecklistRow({ index, image, headers, data, sections, title }) {
  const navigation = useNavigation();
  const img: string = String(image);
  return (
    <View style={{ paddingVertical: 10 }}>
      <BoxWithShadow>
        <Row
          onPress={() => {
            analytics()
              .logEvent("Checklist_MainPage_ChecklistRow_Selected", {
                id: 40000008,
                event: "pick a checklist",
                description: ["press a row to pick a checklist", title],
              })
              .catch((err) => console.log(err));

            navigation.navigate("Checklist Items", { row: index });
          }}
        >
          <RowImage
            style={{
              width: 50,
              height: 30,
              padding: 20,
              resizeMode: "contain",
            }}
            source={image}
          />

          <Title>{title}</Title>
          <View style={{ flex: 1 }} />
          <Ionicons name={"chevron-forward"} size={20} color="black" />
        </Row>
      </BoxWithShadow>
    </View>
  );
}

export default ChecklistRow;

class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
      headers: props.headers,
      data: props.data,
      sections: [],
      expanded: false,
      helpful: false,
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  toggleHelpful = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ helpful: !this.state.helpful });
  };

  helpful = (props) => {
    const helpful = this.state.helpful;
    if (helpful) {
      return (
        <View style={{ flexDirection: "row", padding: 15 }}>
          <Text>Thanks for your feedback!</Text>
          <View style={{ flex: 1 }} />
        </View>
      );
    }
    return (
      <View style={{ flexDirection: "row", padding: 15 }}>
        <Text>Whas this helpful?</Text>
        <View style={{ flex: 1 }} />
        <YesNoButton onPress={() => this.toggleHelpful()}>
          <Text style={{ color: "blue" }}>Yes</Text>
        </YesNoButton>
        <YesNoButton onPress={() => this.toggleHelpful()}>
          <Text style={{ color: "blue" }}>No</Text>
        </YesNoButton>
      </View>
    );
  };

  renderHeaders = () => {
    const headers = [];
    for (let header in this.props.headers) {
      headers.push(
        <View>
          <ExpandedHeader>{header}</ExpandedHeader>
          {this.renderDetails(header)}
        </View>
      );
    }
    return headers;
  };

  renderDetails = (header) => {
    const details = [];
    this.props.headers[header].map((value) =>
      details.push(
        <ListRow>
          <Text>* {value}</Text>
        </ListRow>
      )
    );
    return details;
  };
}

const RowImage = styled.Image``;

const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  padding-left: 16px;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 10px;
  padding-horizontal: 15px;
  align-items: center;
`;

const YesNoButton = styled.TouchableOpacity`
  padding-horizontal: 10px;
`;

const BoxWithShadow = styled.TouchableOpacity`
    background-color: white;
    shadow-color: #000;
    shadow-offset: { width: 5, height: 15 };
    shadow-opacity: 0.5;
    shadow-radius: 10px;
    border-radius: 15px;
`;

const ExpandedRow = styled.View`
  padding-vertical: 16px;
  padding-horizontal: 16px;
`;

const ExpandedHeader = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
  padding-vertical: 10px;
`;

const Separator = styled.View`
  padding-horizontal: 10px;
  background-color: gray;
  height: 1;
`;

const ListRow = styled.Text`
  padding-vertical: 5px;
`;
