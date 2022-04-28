import { createStore } from 'redux'
import localStorage from 'redux-persist/es/storage'
import notesReducer from '../reducers/notesReducer'

let preloadedState
const persistedNotesString = localStorage.getItem('menu')

if (persistedNotesString) {
  preloadedState = {
    todos: JSON.parse(persistedNotesString)
  }
}

const store = createStore(notesReducer, preloadedState)