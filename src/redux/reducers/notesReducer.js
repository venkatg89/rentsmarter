// import the dependency

import { ADD_CHECKLIST_NOTE, ADD_NOTE } from '../constants';
import { DELETE_NOTE } from '../constants';
import remove from 'lodash.remove'


// reducer

const initialState = {
  menu :[
      { 
          image: require('../../../assets/LookingImage/LookingImage.png'),
          title: "When You're Looking",
          header: "Looking for an apartment can be fun, but it can also be stressful! Here’s a guide to help you with your search.",
          checklist: {"Ask Yourself:": 
              [{check: 'Does the advertised rent include a concession? If so, remember that concessions are usually a one-time rent discount.', notes: ""},
              {check: 'Do you need a flexible rent due date? Ask your landlord if this is possible.', notes: ""},
              {check: 'Do you have a pet, or are you anticipating one? Will you need parking? Pets and parking are two common sources of additional fees and deposits when renting.', notes: ""},
              {check: 'What types of amenities are you looking for?', notes: ""},
              {check: 'Does the type of building matter (high rise or garden style walk-up)?',  notes: ""}],
              "Ask the Landlord:": 
              [{check: 'Does the advertised rent include a concession?', notes: ""},
              {check: 'What kind of application do they use?', notes: ""},
              {check: 'Is there an application fee or a fee to hold the apartment?', notes: ""},
              {check: 'Will they do a background check, and if so, what are they looking for and how many years back will they look?', notes: ""},
              {check: 'Is there a minimum credit score or income required?', notes: ""},
              {check: 'Will they consider a renter with a previous eviction?', notes: ""}]},
          notes: "",
      },
      { 
        image: require('../../../assets/SigningImage/SigningImage.png'),
      title: "When You're Signing", 
      header: "A lease is more than just an agreement to rent - it can include everything from where you park to how you keep your pets. Here are some things to think about before you sign.",
      checklist: {"Ask Yourself:": [
        {check: 'How do I get a signed copy of the lease for my records?', notes: ""},], "Ask the Landlord": 
          [{check: "What is included in the rent?", notes: ""},
          {check: "Are there fees and deposits? How much are they, and are they refundable?", notes: ""},
          {check: "Are there penalty fees if you break your lease early?", notes: ""},
          {check: "What are the different lease term options and are the rents different for each option?", notes: ""},
          {check: "Are there annual rent increases, and if so, when do these happen?", notes: ""},
          {check: "Is the apartment subject to rent control?", notes: ""},
          {check: "Are utilities included in the rent? If not, are you supposed to set up your own utility account?", notes: ""},
          {check: "What does the lease renewal process look like?", notes: ""},
          {check: "Is there on-site management or maintenance?", notes: ""}]},
          notes: ""
      },
      { 
        image: require('../../../assets/MovingInImage/MovingInImage.png'),
      title: "When You're Moving In",
      header: "Congratulations on your new apartment! Here's what you'll need to do to set yourself up for success.",
      checklist: {"Ask Yourself:": [{check: 'Do you need a flexible rent payment date, or grace period?', notes: ""}], "Ask the Landlord": 
      [{check: "Are there fees for moving in or moving out?", notes: ""},
      {check: "Are they willing to adjust the rent due date or offer a grace period?", notes: ""}]},
      notes: ""
      },
      {
        image: require('../../../assets/MovingOutImage/MovingOutImage.png'),
      title: "When You're Moving Out",
      header: "You've got boxes, you've got packing tape - but here are some more things you may need to help you plan your big move.",
      checklist: {"Ask Yourself:": [{check: "Have you notified your landlord in writing?", notes: ""},
      {check: "Are you breaking your lease early? Check your lease because there may be a fee for this.", notes: ""},
      {check: "Are there move-out fees? Check your lease – these should be documented.", notes: ""},
      {check: "Do you need to reserve a parking spot or a loading dock space for the moving vehicle? You may need to reserve it ahead of time with your landlord.", notes: ""},
      {check: "Don’t leave any furniture or personal items behind when you move, even if you are discarding them. The landlord legally cannot move them, so you would still be \"occupying\" the apartment and this can cost you money!", notes: ""},
      {check: "In some states you can be present for the move-out inspection. If you can’t attend, take photos of your apartment including the walls and floors in case there are any damage disputes later.", notes: ""}],
      "Ask the Landlord:": [
        {check: "Your landlord says the apartment must be clean, but how clean is “clean”? Some landlords want the apartment to be professionally cleaned, and some want “broom clean” – meaning the floors and visible surfaces are clean. This can impact your security deposit, so ask!", notes: ""},
        {check: "If you paid one, when can you expect your security deposit to be returned? This can be anywhere from 30-60 days and varies by state.", notes: ""},
        {check: "In some states you have the right to receive a written statement detailing any apartment damage expenses that might be charged against your security deposit. If your landlord doesn’t offer a statement, ask them for it.", notes: ""},
        {check: "Ask your landlord what they consider “normal wear and tear” versus apartment damage. It may be a better financial decision to patch up any nail holes yourself rather than risking your security deposit!", notes: ""},
      ]},
      notes: ""
      }
  ]
}

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...state,
        {
          id: action.id,
          note: action.note
        }
      ]

    // this no longer works...what was the original code?, just passed in id I think.jaj
    case DELETE_NOTE:
      const deletedNewArray = remove(state, obj => {
        return obj.id != action.payload
      })
      return deletedNewArray

    case ADD_CHECKLIST_NOTE:
      // const newNote = state.menu[action.row];
      let updatedNote = state.menu[action.payload.rootRow].checklist[action.payload.rowKey].map((data, index) => {
        if (index == action.payload.row) {
          data.notes = action.payload.notes;
        }
        return data;
      }
      )
      return {
        ...state, 
          state: updatedNote
        
      }

    default:
      return state
  }
}

export default notesReducer