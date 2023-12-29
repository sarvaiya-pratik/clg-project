import { useSelector } from "react-redux"


export const getCurrentUserHook = () =>{
    const user = useSelector((state) => state.user.users)
    return user
}

export const getUserCartHook = () =>{
    const cart = useSelector((state)=>state.cart.cart)
    return cart
}
