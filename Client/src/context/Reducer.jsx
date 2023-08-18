
const CartReducer = (state, action) => {


    switch (action.type) {
        case 'ADD_TO_CART':
          const existingItem = state.cart.find(item => item.product.id === action.payload.product.id);
    
          if (existingItem) {
            const updatedCart = state.cart.map(item =>
              item.product.id === action.payload.product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
    
            return {
              ...state,
              cart: updatedCart,
            };
          } else {
            return {
              ...state,
              cart: [...state.cart, { product: action.payload.product, quantity: 1 }],
            };
          }
    
        default:
          return state;
      }
    };
    
    // switch (action.type) {
    //     case "ADD_TO_CART":

    //         const existingItem = state.cart.find(e => e._id === action.payload._id);


    //         if (existingItem) {
    //             console.log("exist se")

    //             const updatedCart = state.cart.map(item =>
    //                 item._id === action.payload._id
    //                     ? { ...item, qty: item.qty + 1 }
    //                     : item
    //             );  
    //             return { ...state, cart: updatedCart }
              


    //         } else {
    //             // If the item is new, add it to the cart

    //             return {
    //                 ...state,
    //                 cart: [...state.cart, { ...action.payload, qty: 1 }]


    //             }
    //         }



    //     case "REMOVE_FROM_CART":
    //         return { ...state, cart: state.cart.filter((c) => c._id !== action.payload) }

    //     case "INCREMENT":
    //         let updatedata = state.cart.map((e) => {
    //             if (e._id === action.payload) {
    //                 if (state.cart.qty < 1) {
    //                     e.qty = 0;
    //                 }
    //                 let incqty = e.qty + 1;
    //                 if (incqty > 7) {
    //                     incqty = 7;
    //                 }
    //                 return { ...e, qty: incqty }
    //             }
    //             else {
    //                 return e;
    //             }
    //         })
    //         return { ...state, cart: updatedata }
    //     case "DECREMENT":
    //         let updated = state.cart.map((e) => {
    //             if (e._id === action.payload) {

    //                 let decqty = e.qty - 1;
    //                 if (decqty <= 1) {
    //                     decqty = 1;
    //                 }
    //                 return { ...e, qty: decqty }
    //             }
    //             else {
    //                 return e;
    //             }
    //         })
    //         return { ...state, cart: updated }
    //     case "total_price":
    //         let total_price = state.cart.reduce((init, e) => {
    //             let { price, qty } = e;
    //             if (qty) {
    //                 init += price * qty;
    //                 return init
    //             }
    //             else {
    //                 qty = 0;
    //             }

    //         }, 0)
    //         return {
    //             ...state,
    //             cart: [...state.cart, total_price]
    //         }
    //     default:
    //         return state;
    // }
// }

export default CartReducer;

