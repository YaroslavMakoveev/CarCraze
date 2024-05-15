/* REACT BOOTSTRAP */
import { Container } from "react-bootstrap";

/* COMPONENTS */
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import CarScreen from "./screens/CarScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
// import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
// import UserListScreen from "./screens/UserListScreen";
// import UserEditScreen from "./screens/UserEditScreen";
// import ProductListScreen from "./screens/ProductListScreen";
// import ProductEditScreen from "./screens/ProductEditScreen";
// import OrderListScreen from "./screens/OrderListScreen";

/* REACT ROUTER */
import { BrowserRouter as Router, Route } from "react-router-dom";
import Star from "./components/star";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import TestDriveScreen from "./screens/TestDriveScreen";
import TradeInScreen from "./screens/TradeInScreen";

import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);


function App() {
  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;
  return (
    <Router>
     <div  style={{ position:"sticky",top: 0, zIndex: "100" }} ><Header /></div> 
      <Container>
        <main className="py-3">
          <Route exact path="/" component={HomeScreen} />
          <Route path="/page/:pageNumber" component={HomeScreen} />

          <Route path="/login" component={LoginScreen} />

          <Route path="/register" component={RegisterScreen} />

          <PrivateRoute
            path="/profile"
            isAuthenticated={userDetails} // Передаем информацию о пользователе
            component={ProfileScreen}
          />

          <PrivateRoute
            path="/placeOrder"
            isAuthenticated={userDetails} // Передаем информацию о пользователе
            component={PlaceOrderScreen}
          />

          <PrivateRoute
            path="/orderDetail"
            isAuthenticated={userDetails} // Передаем информацию о пользователе
            component={OrderScreen}
          />

          <Route path="/car/:id" component={CarScreen} />

          <Route path="/cart/:id?" component={CartScreen} />

          <PrivateRoute
            path="/test-drive/:id"
            isAuthenticated={userDetails} // Передаем информацию о пользователе
            component={TestDriveScreen}
          />

          <PrivateRoute
            path="/trade-in/:id"
            isAuthenticated={userDetails} // Передаем информацию о пользователе
            component={TradeInScreen}
          />
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
