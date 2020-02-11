// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';
// var redux=require('redux');
// var oldstate={
//
// }
// const middleware=[thunk]
//
// var store1=createStore(rootReducer,oldstate,compose(
//   applyMiddleware(...middleware)
// ))
// store1.subscribe(() => console.log(JSON.stringify(store1.getState())))
// // store1.dispatch(getItems())
// export default store1;
import { createStore, combineReducers } from "redux";
var redux=require('redux');
var oldstate={
     data:[],
     infor:{},
     infor1:{},

}

var reducer1=(state=oldstate,action)=>{
    switch (action.type) {

            case "GET_INFOR":
            return {...state,infor:action.getinfor
            }
            case "GET_INFOR1":
            return {...state,infor1:action.getinfor1
            }
            case "GET_DATA__FROM__DB":
            return {...state,data:action.getdata
            }
        default:
        return state
            break;
    }

}

var store1=redux.createStore(reducer1);
store1.subscribe(() => console.log(JSON.stringify(store1.getState())))

export default store1;
