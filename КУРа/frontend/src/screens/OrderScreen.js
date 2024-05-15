import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";


/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";


 
function OrderScreen({ history  }) {
 
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const order  = useSelector((state) => state.order );
  const { orderDetails, error, loading } = order ;
  console.log(orderDetails )

  const userLogin = useSelector((state) => state.user );
  const { userDetails } = userLogin;

  let updatedOrderDetails = orderDetails;

  if (updatedOrderDetails && updatedOrderDetails.orderItems && updatedOrderDetails.orderItems.length > 0) {
    const itemsPrice = updatedOrderDetails.orderItems.reduce(
      (acc, item) => acc + item.Price * item.qty,
      0
    );
  
    updatedOrderDetails = { ...updatedOrderDetails, itemsPrice };
  }

  useEffect(() => {
    // IS USER IS NOT LOGGED IN THEN REDIRECT TO LOGIN PAGE
    if (!userDetails) {
      history.push("/login");
 
    }
  }, [dispatch, orderDetails,    history, userDetails]);
  
  // Calculate the total price of each individual item
const calculateItemsPrice = () => {
  if (orderDetails.orderItems && orderDetails.orderItems.length > 0) {
    return orderDetails.orderItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) * item.qty;
      return total + itemPrice;
    }, 0);
  }
  return 0;
};

// Call the calculateItemsPrice method to get the total price
const itemsPrice = calculateItemsPrice();

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Заказ №{orderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">

            <ListGroup.Item>
              <h2>Заказанные автомобили</h2>
                {orderDetails.orderItems.length === 0 ? (
                  <Message variant="info">Ваш заказ пуст</Message>
                ) : (
                  <ListGroup variant="flush">
                    {orderDetails.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={4}>
                            <Image
                              src={item.image}
                              alt={item.Brand + ' ' + item.Model}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col>
                            <Link to={`/car/${item.car}`}>
                            {item.name}
                            </Link>
                          </Col>

                          <Col>
                            {(item.qty * item.price)}₽
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Сумма заказа</h2>
              </ListGroup.Item>

              {/* <ListGroup.Item>
                <Row>
                  <Col>Products Cost:</Col>

                  <Col>{itemsPrice}₽</Col>
                </Row>
              </ListGroup.Item> */}

              <ListGroup.Item>
                <Row>
                  <Col>Итого:</Col>

                  <Col>{orderDetails.totalPrice}₽</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

             
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
