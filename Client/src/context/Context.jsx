import { createContext, useContext, useReducer } from "react";
import CartReducer from "./Reducer";

const Cart = createContext();
const Context = ({ children }) => {

    const [state, disptch] = useReducer(CartReducer, {
        cart: [],
    });


    return (

        <Cart.Provider value={{ state, disptch }}>
            {children}
        </Cart.Provider>

    )
}

export default Context;

export const CartState = () => {
    return useContext(Cart)
}
