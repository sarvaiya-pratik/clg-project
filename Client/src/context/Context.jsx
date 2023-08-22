import { createContext, useContext, useEffect, useReducer, useState } from "react";
import CartReducer from "./Reducer";
import axios from "axios";
const CartContext = createContext();
const Context = ({ children }) => {

    const [cart, dispatch] = useReducer(CartReducer, []);
    const [cartdata, setCartData] = useState()

    const updateCartOnServer = (userId, cart, totalAmount) => {
        axios.post("http://localhost:4001/cart/add-to-cart", { userId, cart, totalAmount })
            .then((r) => {
                console.log("response", r.data)
            })
    }

    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const uid = localStorage.getItem("userId");
    const totalAmount = calculateTotalAmount();

    useEffect(() => {
        console.log("cart", cart)
        localStorage.setItem("cart-data", JSON.stringify(cart));
        setCartData(localStorage.getItem("cart-data"))
        // updateCartOnServer(uid, cartdata, totalAmount)
    }, [cart])
    return (

        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>

    )
}

export default Context;

export const UseCart = () => {
    return useContext(CartContext)
}

