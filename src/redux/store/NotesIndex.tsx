import notesStore from "./NotesStore"

// Log the initial state
// console.log('Initial state: ', notesStore.getState())
// {todos: [....], filters: {status, colors}}

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = notesStore.subscribe(() =>
  // console.log('State after dispatch: ', notesStore.getState())
)

// Now, dispatch some actions

notesStore.dispatch({ type: 'menu', payload: 'Learn about actions' })


// Stop listening to state updates
unsubscribe()

// Dispatch one more action to see what happens

// notesStore.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })

// Omit existing React rendering logic