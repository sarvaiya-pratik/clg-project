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
import { FiTrendingUp } from "react-icons/fi";
import SaleChart from "./charts/SaleChart";
import PaymentChart from "./charts/PaymentChart";

const Dashboard = ({ slider }) => {
  const product = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user.users);
  const order = useSelector((state) => state.order.order);

  const totalSales = Array.isArray(order) ? order.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalPrice
  }, 0) : 0
  const [stock, setStock] = useState(0)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getalluser());
    dispatch(getproductall());
    dispatch(getOrders());

  }, []);

  const calculatePayment = (orders) => {
    let pendingPyment = 0;
    let succesPyment = 0;
    orders.forEach((order) => {

      if (order.paymentStatus == "pending") {
        pendingPyment += order.totalPrice
      }
      else if (order.paymentStatus == 'paid') {
        succesPyment += order.totalPrice
      }

    })
    return { pendingPyment, succesPyment }

  }

  let whatPayment = order && calculatePayment(order)

  const calculateTotalSalesByMonth = (orders) => {
    const totalSalesByMonth = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.orderDate);
      const month = orderDate.getMonth() + 1

      // Add sales to the corresponding month
      if (totalSalesByMonth[month]) {
        totalSalesByMonth[month] += order.totalPrice;
      } else {
        totalSalesByMonth[month] = order.totalPrice;
      }
    });
    const salesArray = [];
    for (let month = 1; month <= 12; month++) {
      // If sales data exists for the month, use it, otherwise default to 0
      const sales = totalSalesByMonth[month] || 0;
      salesArray.push(sales);
    }

    return salesArray;
  };

  const totalSalesByMonth = order && calculateTotalSalesByMonth(order);

  console.log("Total sales", totalSalesByMonth)

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
              <FiTrendingUp />
            </div>
            <div className="right">
              <p>Total Sales</p>
              <h2>{totalSales}</h2>
              {/* <span onClick={() => navigate("/admin/users")}>see all user</span> */}
            </div>
          </div>
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

        <div className="chart-container">
          <div className="chart1">
            <SaleChart totalSalesByMonth={totalSalesByMonth} />
          </div>
          <div className="chart2">
            <PaymentChart whatPayment={whatPayment}  />
          </div>
        </div>

        {/* <div className="paymentChart"> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default Dashboard;
