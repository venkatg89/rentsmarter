import {
  ARC_SEGMENT_1_BEGIN,
  ARC_SEGMENT_1_END,
  ARC_SEGMENT_2_BEGIN,
  ARC_SEGMENT_2_END,
  ARC_SEGMENT_3_BEGIN,
  ARC_SEGMENT_3_END,
  ARC_SEGMENT_4_BEGIN,
  ARC_SEGMENT_4_END,
  ARC_SEGMENT_5_BEGIN,
  ARC_SEGMENT_5_END,
  ARC_SEGMENT_6_BEGIN,
  ARC_SEGMENT_6_END,
} from "../constants";

const initialState = {
    arc_segment_1_begin: 0,
    arc_segment_1_end: 0,
    arc_segment_2_begin: 0,
    arc_segment_2_end: 0,
    arc_segment_3_begin: 0,
    arc_segment_3_end: 0,

    arc_segment_4_begin: 0,
    arc_segment_4_end: 0,
    arc_segment_5_begin: 0,
    arc_segment_5_end: 0,
    arc_segment_6_begin: 0,
    arc_segment_6_end: 0,

};

const arcReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARC_SEGMENT_1_BEGIN:
      // console.log("arc segment 1 begin change");
      return {
        ...state,
        arc_segment_1_begin: action.payload,
      };

    case ARC_SEGMENT_1_END:
      // console.log("arc segment 1 end change");
      return {
        ...state,
        arc_segment_1_end: action.payload,
      };

    // 2

    case ARC_SEGMENT_2_BEGIN:
      // console.log("arc segment 2 begin change");
      return {
        ...state,
        arc_segment_2_begin: action.payload,
      };

    case ARC_SEGMENT_2_END:
      // console.log("arc segment 2 end change");
      return {
        ...state,
        arc_segment_2_end: action.payload,
      };

    // 3

    case ARC_SEGMENT_3_BEGIN:
      // console.log("arc segment 3 begin change");
      return {
        ...state,
        arc_segment_3_begin: action.payload,
      };

    case ARC_SEGMENT_3_END:
      // console.log("arc segment 3 end change");
      return {
        ...state,
        arc_segment_3_end: action.payload,
      };

    // 4

    case ARC_SEGMENT_4_BEGIN:
      // console.log("arc segment 4 begin change");
      return {
        ...state,
        arc_segment_4_begin: action.payload,
      };

    case ARC_SEGMENT_4_END:
      // console.log("arc segment 4 end change");
      return {
        ...state,
        arc_segment_4_end: action.payload,
      };

    // 5

    case ARC_SEGMENT_5_BEGIN:
      // console.log("arc segment 5 begin change");
      return {
        ...state,
        arc_segment_5_begin: action.payload,
      };

    case ARC_SEGMENT_5_END:
      // console.log("arc segment 5 end change");
      return {
        ...state,
        arc_segment_5_end: action.payload,
      };

    // 6

    case ARC_SEGMENT_6_BEGIN:
      // console.log("arc segment 6 begin change");
      return {
        ...state,
        arc_segment_6_begin: action.payload,
      };

    case ARC_SEGMENT_6_END:
      // console.log("arc segment 6 end change");
      return {
        ...state,
        arc_segment_6_end: action.payload,
      };

    default:
      // console.log("in arc reducer default");
      return state;
  }
};

export default arcReducer;
