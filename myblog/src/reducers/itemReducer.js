import{ GET_ITEM,ADD_ITEM,DELETE_ITEM,ITEM__LOADING}  from '../actions/type';
const oldstate={
  items:[],
  loading:false,
  test:true



}
export default function(state=oldstate,action){
  switch (action.type) {
    case GET_ITEM:
      return{
        ...state,
        items:action.payload,
        loading:false
      }
      case DELETE_ITEM:
        return{
          ...state,
          item:state.items.filter(item =>item.id!=action.payload)
        }
        case ITEM__LOADING:
          return{
            ...state,loading:true,test:false
          }
    default:
    return state;

  }
}
