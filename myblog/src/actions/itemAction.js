import{ GET_ITEM,ADD_ITEM,DELETE_ITEM,ITEM__LOADING}  from './type';
import axios from 'axios'
export const getItems =(payload)=>{
return function (dispatch) {
  axios
  .get('./users')
  .then(res=>{
    const payload =res.data
    dispatch(getItems(payload))
  })
  .catch(err=>{

  })
}
};


export const deleteItems =(id)=>{
  return{
    type:DELETE_ITEM,
    payload:id
  };
};
export const setItemsLoading =()=>{
  return{
    type:ITEM__LOADING

  };
};
