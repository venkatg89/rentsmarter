import React, { Component, useEffect } from "react";

// styled-components
import styled from "styled-components/native";

// react-navigation
import { createStackNavigator } from "@react-navigation/stack";

// application

import NavTitleChecklist from "./NavTitleChecklistDetails";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import Notes from "./NotesRow";
import analytics from "@react-native-firebase/analytics";

// react-native
import { Text, ScrollView, View, Image, Dimensions } from "react-native";
import noteStore from "../../redux/store/NotesStore";

const windowWidth = Dimensions.get("window").width;

function ChecklistDetails({ route, navigation }) {
  const { row } = route.params;
  const notes = noteStore.getState();

  const checklist = {
    showNotes: false,
    expanded: false,
  };

  const renderAccordians = () => {
    const items = [];

    let item = notes.menu[row];
    items.push(
      <View key={row}>
        <View>
          <ExpandedRow>{renderHeaders(item.note, notes.menu)}</ExpandedRow>
        </View>
      </View>
    );
    return items;
  };

  const renderHeaders = (title: string, checklist: JSX.Element[]) => {
    const headerList = [];
    Object.keys(checklist[row].checklist).map((key) =>
      headerList.push(
        <View key={key}>
          <HeaderView>
            <ExpandedHeader>{key}</ExpandedHeader>
          </HeaderView>
          {renderDetails(key, checklist)}
        </View>
      )
    );
    return headerList;
  };

  const renderDetails = (rowKey: string, checklist: JSX.Element[]) => {
    const details = [];
    checklist[row].checklist[rowKey].map((list, index) =>
      details.push(
        <View key={index}>
          <Notes
            rootRow={row}
            value={list.check}
            row={index}
            rowKey={rowKey}
            notes={list.notes}
          />
        </View>
      )
    );
    // )
    return details;
  };

  const renderNotes = () => {
    return (
      <View>
        <Note></Note>
        <View style={{ paddingBottom: 20, flexDirection: "row" }}>
          <NoteButton>
            <ButtonText style={{ color: "blue" }}>Clear</ButtonText>
          </NoteButton>
          <NoteButton>
            <ButtonText>Undo</ButtonText>
          </NoteButton>
          <View style={{ flex: 1 }} />
          <NoteButton>
            <ButtonText>Done</ButtonText>
          </NoteButton>
        </View>
      </View>
    );
  };

  // const toggleExpand=()=>{
  //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //     this.setState({expanded : !this.state.expanded})
  //   }

  useEffect(() => {
    analytics().logEvent("Chklist_DetailPg_Arrived", {
        id: 40000007,
        event: "checklist details",
        description: ["open checklist details page", notes.menu[row].title],
      });
  }, []);

  return (
    <SafeArea>
      <View
        style={{
          backgroundColor: "#ebedeb",
          width: windowWidth,
          alignItems: "center",
        }}
      >
        <Text> </Text>
        <RowImage
          style={{ width: 50, height: 50, resizeMode: "contain" }}
          source={notes.menu[row].image}
        />
        <Title>{notes.menu[row].title}</Title>
      </View>
      <NoteHeader>
        <NoteHeaderText style={{ color: "black" }}>
          {notes.menu[row].header}
        </NoteHeaderText>
      </NoteHeader>
      <ScrollView style={{ width: windowWidth }}>
        <Container>{renderAccordians()}</Container>
      </ScrollView>
    </SafeArea>
  );
}

export default ChecklistDetails;

const RowImage = styled.Image`
  padding-top: 20px;
`;

const NoteHeader = styled.View`
  padding-horizontal: 20px;
  justify-content: center;
  padding-top: 10px;
`;

const NoteHeaderText = styled.Text`
  justify-content: center;
`;

const HeaderView = styled.View``;

const Container = styled.View`
  padding-horizontal: 10px;
`;

const BoxWithShadow = styled.View`
    background-color: white;
    shadow-color: #000;
    shadow-offset: { width: 5, height: 15 };
    shadow-opacity: 0.5;
    shadow-radius: 10px;
    border-radius: 15px;
`;
const ListRow = styled.TouchableOpacity`
  flex-direction: row;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
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

const SafeArea = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: #f8f6f5;
  align-items: center;
`;

const Title = styled.Text`
  padding: 20px;
  color: black;
  fontweight: bold;
  font-size: 20px;
`;

const Note = styled.TextInput`
  height: 100px;
  margin: 12px;
  border-width: 1px;
  border-radius: 15px;
`;

const ButtonText = styled.Text`
  color: blue;
`;

const NoteButton = styled.TouchableOpacity`
  padding-horizontal: 10px;
`;
