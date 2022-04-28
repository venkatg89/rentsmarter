import { createStore } from 'redux'
import notesReducer from '../reducers/notesReducer'

const noteStore = createStore(notesReducer)

export default noteStore