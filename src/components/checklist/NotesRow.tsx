import React, { useState } from "react";

// styled-components
import styled from "styled-components/native";

// react-navigation
import { createStackNavigator } from "@react-navigation/stack";

// application
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import { connect } from "react-redux";
import { saveChecklistNote } from "../../redux/actions/actions";
import { useSelector } from "react-redux";
import noteStore from "../../redux/store/NotesStore";
import allReducers from "../../redux/reducers/allReducers";

// react-native
import { Text, View, Dimensions, LayoutAnimation } from "react-native";

import analytics from '@react-native-firebase/analytics';


const windowWidth = Dimensions.get("window").width;

let select = (state, props) => ({});

function NotesRow(props) {
  const rootState = useSelector((state) => state);

  const { rootRow, row, rowKey, notes } = props;

  const [locNotes, setLocNotes] = useState(notes);
  const savedNote = notes;
  const saveChecklistNotes = (locNotes) =>
    noteStore.dispatch(
      saveChecklistNote({ rootRow, row, rowKey, note: locNotes })
    );

  const [locShowNotes, setLocShowNotes] = useState(false);

  const toggleExpand = () => {

     analytics().logEvent("Checklist_DetailsPg_Note_ExpandBtn_Press", {
      id: 40000006,
      event: "toggle expand note",
      description: ["open a checklist note"],
     
    });
    
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLocShowNotes(!locShowNotes);
    // props.showNotes = !props.showNotes;
    // console.log(rootState);
  };

  const saveNote = (noteText) => {
    // console.log("Testing " + locNotes);
     analytics().logEvent("Chklist_DetailPg_Note_SaveBtn_Press", {
      id: 40000002,
      event: "save note",
      description: ["save a note"],
     
    });
    setLocNotes(locNotes);
    saveChecklistNotes(locNotes);
    // props.note = noteText;
    // console.log(rootState);

    toggleExpand();
  };

  const updateNote = (noteText) => {
     analytics().logEvent("Chklist_DetailPg_Note_UpdatBtn_Press", {
      id: 40000003,
      event: "update a note",
      description: ["update a note"],
     
    });
    setLocNotes(noteText);
    // console.log("Note update" + locNotes);

    // console.log(rootState);

    // props.updatedNote = noteText;
  };

  const clearNote = () => {
    analytics().logEvent("Chklist_DetailPg_Note_ClearBtn_Press", {
      id: 40000004,
      event: "clear note",
      description: ["clear a note"],
     
    });
    setLocNotes("");
    // console.log("clear note" + locNotes);

    // console.log(rootState);
  };

  const undoNoteChange = () => {
     analytics().logEvent("Chklist_DetailPg_Note_UndoBtn_Press", {
      id: 40000005,
      event: "undo a  note",
      description: ["undo a note"],
     
    });
    setLocNotes(savedNote);
  };

  return (
    <View>
      <Row onPress={() => toggleExpand()}>
        <View style={{ width: windowWidth * 0.8 }}>
          <Text style={{ paddingVertical: 10 }}>{props.value}</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View>
          <Ionicons
            name={
              locNotes.length > 0
                ? "checkmark-circle-outline"
                : locShowNotes
                ? "chevron-down"
                : "add-circle"
            }
            size={20}
            color={locNotes.length > 0 ? "green" : "black"}
          />
        </View>
      </Row>
      {locShowNotes && (
        <View>
          <Note
            multiline={true}
            value={locNotes}
            intext
            onChangeText={(text) => updateNote(text)}
          ></Note>
          <View style={{ paddingBottom: 20, flexDirection: "row" }}>
            <NoteButton
              onPress={(event) => clearNote()}
              disabled={locNotes.length == 0}
            >
              <ButtonText style={{ color: "blue" }}>Clear</ButtonText>
            </NoteButton>
            {locNotes.length > 0 && saveNote != locNotes && (
              <NoteButton onPress={(event) => undoNoteChange()}>
                <ButtonText>Undo</ButtonText>
              </NoteButton>
            )}
            <View style={{ flex: 1 }} />
            <NoteButton onPress={(event) => saveNote(event.nativeEvent.text)}>
              <ButtonText>Done</ButtonText>
            </NoteButton>
          </View>
        </View>
      )}
    </View>
  );
}

export default connect(select)(NotesRow);

const Note = styled.TextInput`
  height: 100px;
  margin: 12px;
  border-width: 1px;
  border-radius: 15px;
  text-align-vertical: top;
  padding-left: 12px;
  padding-right: 12px;
`;

const ButtonText = styled.Text`
  color: blue;
`;

const NoteButton = styled.TouchableOpacity`
  padding-horizontal: 10px;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
`;
