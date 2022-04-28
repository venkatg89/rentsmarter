import { createStore } from 'redux'
import localStorage from 'redux-persist/es/storage'
import notesReducer from '../reducers/notesReducer'

let preloadedState
const persistedTodosString = localStorage.getItem('menu')

if (persistedTodosString) {
  const notesState = {
    notes: JSON.parse(persistedTodosString)
  }
}

const store = createStore(notesReducer, preloadedState)