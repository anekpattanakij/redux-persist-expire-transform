# redux-persist-expire-transform
Expired transform reducer option for redux-persist. I initiated this project to support redux-persist V.5 up

## Example

```js
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import expireTransform from "redux-persist-expire-transform";
import { combineReducers } from 'redux';

const reducerWithExpiration = [
  // your reducers
  'example1','example2'
];

const allReducers = combineReducers({
    ...reducerList,
 });
 
const expireInMinutes = 24 * 60; // expire in 24h
const persistConfig = {
  key: "root",
  storage,
  transforms: [expireTransform(expireInMinutes, reducerWithExpiration)]
};

const persistedReducer = persistReducer(persistConfig, allReducers);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
```

## Configuration

| Attr          | Type   | Default                 | Notes                                           |
| ------------- | ------ | ----------------------- | ----------------------------------------------- |
| expireInMinutes      | Number | none                    | For how long the state is going to be preserved in minutes |
| whitelist | String[] | none | Array of state's name that would like to add expiration time                   |
