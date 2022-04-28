import { createStore, Store } from "redux";
import { persistStore, persistReducer } from 'redux-persist';

import { Persistor, PersistorOptions } from "redux-persist/es/types";
import AsyncStorage from "@react-native-async-storage/async-storage";



import allReducers from "../reducers/allReducers";

const configurePersistentStore = () => {
  
    let persistorOptions: PersistorOptions = {}
    let persistor: Persistor = persistStore(store, persistorOptions);
    return { store, persistor }
}


export default configurePersistentStore;


const rehydrationComplete = () => {
     
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, allReducers)

let store: Store = createStore(persistedReducer);
 

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch