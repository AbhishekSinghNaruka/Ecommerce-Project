
export const cartReducers = (state={cartItems:[]},action) => {
  switch(action.type){
    case "ADD_TO_CART":
      const item = action.payload;
      const itemsExist = state.cartItems.find(it => it.product===item.product);
      if(itemsExist){
        return{
          ...state,
          cartItems: state.cartItems.map(it => it.product===itemsExist.product?item:it)
        }
      }
      else{
        return{
          ...state,
          cartItems:[...state.cartItems,item]
        }
      }
      default: return state
  }
}
