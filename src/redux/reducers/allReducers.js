
import countReducer from './countReducer'
import notesReducer from './notesReducer'
import calculatorUIReducer from './calculatorUIReducer';
import arcReducer from './arcReducers';

import { combineReducers } from 'redux'
import calculatorCalculationsReducer from './calculatorCalculationsReducer';
 
 

const allReducers = combineReducers({

   
    calculatorUIData: calculatorUIReducer,
    calculatorCalculationsData: calculatorCalculationsReducer,
    arcData: arcReducer,

})

export default allReducers;

