
import thunkMIddleware from 'redux-thunk';
import request_3_phase from '../middlewares/request_3_phase';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';


export default function configureStore(initialState) {

  const store = createStore(rootReducer, initialState,
    applyMiddleware(thunkMIddleware, request_3_phase)
    // 触发redux-devtools
    // window.devToolExtions ? window.devToolExtions() : undefined
  )
  return store;
}

