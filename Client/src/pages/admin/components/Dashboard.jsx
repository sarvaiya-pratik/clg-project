import "./style.css";
import axios from "axios";
import { BiUser, BiSolidDiamond } from "react-icons/bi";
import { CiDeliveryTruck } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getalluser } from "../../../redux/user/userApi";
import { getproductall } from "../../../redux/product/productApi";
import { getOrders } from "../../../redux/order/orderApi";
import { BsCartX } from "react-icons/bs";

const Dashboard = ({ slider }) => {
  const product = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user.users);
  const order = useSelector((state) => state.order.order);
  const [stock, setStock] = useState(0)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getalluser());
    dispatch(getproductall());
    dispatch(getOrders());

  }, []);

  useEffect(() => {

    Array.isArray(product) && product.map((item) => {
      if (item.quantity == 0) {
        setStock((pre) => pre + 1)
      }
    })
    return (() => {
      setStock(0)
    })
  }, [product])
  const navigate = useNavigate();
  return (
    <>
      <div id="dashboard" className="content-admin">
        <h2 className="admin-header">DASHBOARD</h2>

        <div className="all-cards">
          <div className="user-card">
            <div className="left">
              <BiUser />
            </div>
            <div className="right">
              <p>users</p>
              <h2>{user && user.length}</h2>
              <span onClick={() => navigate("/admin/users")}>see all user</span>
            </div>
          </div>

          <div className="user-card">
            <div className="left">
              <BiSolidDiamond />
            </div>
            <div className="right">
              <p>Diamonds</p>
              <h2>{product && product.length}</h2>
              <span onClick={() => navigate("/admin/diamonds")}>
                see all diamonds
              </span>
            </div>
          </div>

          <div className="user-card">
            <div className="left">
              <CiDeliveryTruck />
            </div>
            <div className="right">
              <p>Orders</p>
              <h2>{order && order.length}</h2>
              <span onClick={() => navigate("/admin/order")}>
                see all Orders
              </span>
            </div>
          </div>
          <div className="user-card" >
            <div className="left">
              <BsCartX />
            </div>
            <div className="right">
              <p>Out of Stock</p>
              <h2>{stock}</h2>
              {/* <span onClick={() => navigate("/admin/order")}>
                see all Orders
              </span> */}
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default Dashboard;
