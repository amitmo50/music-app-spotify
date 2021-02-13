import {createStore, combineReducers} from 'redux';

import MusicPlayerReducer from './reducers/MusicPlayerReducer';

const rootReducer = combineReducers({
    MusicPlayerData: MusicPlayerReducer,
});

const store = createStore(rootReducer);

export default store;