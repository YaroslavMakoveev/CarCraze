import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Table, Container, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {deleteUser , updateUser, } from "../redux/slices/userSlice";
import { listMyOrders , getOrderDetails} from "../redux/slices/orderSlice";
import { deleteTestDrive, listMyTestDrives, createTestDrive } from "../redux/slices/testDriveSlice"; // Импорт экшена для создания записи на тест-драйвimport Message from "../components/Message";
import Loader from "../components/Loader";
import { listMyTradeIns, deleteTradeIn } from "../redux/slices/tradeInSlice";
import CancelIcon from '@mui/icons-material/Cancel';
import { getUserCars, createUserCar, updateUserCar, deleteUserCar } from '../redux/slices/userSlice';
import Message from "../components/Message";
import { Link } from "react-router-dom";

function ProfileScreen({ history }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const { userDetails, userCars, loading, error } = useSelector((state) => state.user);
  const { testDriveList, loading: loadingTestDrives, error: errorTestDrives } = useSelector((state) => state.testDrive);
  const { tradeInList, loading: loadingTradeIns, error: errorTradeIns } = useSelector((state) => state.tradeIn);
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(null);

  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  // const { userDetails, loading, error } = user;
  const userData = {
    id: userDetails._id,
    name: name,
    email: email,
    password: password,
  };

  const order = useSelector((state) => state.order);
  const { orderDetails, listorder, loading: loadingOrders, error: errorOrders } = order;

  let orderCar = orderDetails;

  // const orderItem = useSelector((state) => state.orderItem);
  // const { listorder, loading: loadingOrders, error: errorOrders } = order;


  useEffect(() => {
    if (!userDetails) {
      history.push("/login");
    } else {
        dispatch(listMyOrders());
        dispatch(listMyTestDrives());
        dispatch(listMyTradeIns());

        setName(userDetails.name);
        setEmail(userDetails.email);
    }
  }, [dispatch, history, userDetails, error]);

  const deleteHandler = (testDriveId) => {
    if (!testDriveId) {
      console.error("Invalid test drive id");
      return;
    }
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTestDrive(testDriveId));
      window.location.reload();
    }
  };
  
  const deleteTradeInHandler = (tradeInId) => {
    if (!tradeInId) {
      console.error("Invalid trade-in id");
      return;
    }
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTradeIn(tradeInId));
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!userDetails) {
      history.push('/login');
    } else {
      dispatch(getUserCars());
    }
  }, [dispatch, history, userDetails]);


  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUser(userDetails.id, userData));
      console.log(userData)
      setMessage("");
    }
  };
  
  const handleDeleteUser = () => {
    // Call the deleteUser action from userSlice
    dispatch(deleteUser(userDetails.id));
    history.push('/');
    window.location.reload(); // Reload the page

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = { brand, model, year, mileage, image };
    await dispatch(createUserCar(carData));
    setBrand('');
    setModel('');
    setYear('');
    setMileage('');
    setImage(null); // Reset image state after submission
  };

  const handleUpdate = (car) => {
    setBrand(car.brand);
    setModel(car.model);
    setYear(car.year);
    setMileage(car.mileage);
    setImage(car.image);
  };

  const handleDelete = (carId) => {
    dispatch(deleteUserCar(carId));
  };



  return (
    <Row>
      <Col md={3}>
        <h2>Профиль</h2>
        {/* {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>} */}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} >
          <Form.Group controlId="name">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Введите имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Адрес эл. почты</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Введите эл. почту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Повторите пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Обновить
          </Button>

        </Form>
        {/* <Button type="submit" variant="danger" className="mt-3" onClick={handleDeleteUser}>
         <div style={{fontSize:"7px" }}><CancelIcon />  Account </div> 
          </Button> */}
      </Col>

      <Col md={9}>
        <h2>Мои заказы</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Дата</th>
                <th>Итог</th>
              </tr>
            </thead>

            <tbody>
            {listorder
      // .filter((order) => order.isPaid) // Filter out unpaid orders
      .map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>  
                  <td>{order.DateTime ? order.DateTime.substring(0, 10) : null}</td>
                  <td>{order.totalPrice}₽</td>
                  {/* <td>{orderDetails.orderItems.Brand}</td> */}
                  <td>
                    <LinkContainer to={`/orderDetail`}>
                      <Button className="btn-sm" onClick={() => dispatch(getOrderDetails(order._id))}>Детали</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <h2>Мои трейд-ины</h2>
        {loadingTradeIns ? (
          <Loader />
        ) : errorTradeIns ? (
          <Message variant="danger">{errorTradeIns}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Автомобиль</th>
                <th>Мой автомобиль</th>
              </tr>
            </thead>
            <tbody>
              {tradeInList && tradeInList.map((tradeIn) => (
                <tr key={tradeIn._id}>
                  <td>{tradeIn._id}</td>
                  <td>
                    {tradeIn.car && (
                      <Link to={`/car/${tradeIn.car}`}>
                          {tradeIn.car}
                      </Link>
                    )}
                  </td>
                  <td>{tradeIn.userCar}</td>
                  
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteTradeInHandler(tradeIn._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <h2>Мои тест-драйвы</h2>
        {loadingTestDrives ? (
          <Loader />
        ) : errorTestDrives ? (
          <Message variant="danger">{errorTestDrives}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Дата</th>
                <th>Время</th>
                <th>Автомобиль</th>
                
              </tr>
            </thead>
            <tbody>
              {testDriveList && testDriveList.map((testDrive) => (
                <tr key={testDrive._id}>
                  <td>{testDrive._id}</td>
                  <td>{testDrive.date}</td>
                  <td>{testDrive.time}</td>
                  <td>
                    {testDrive.car && (
                      <Link to={`/car/${testDrive.car}`}>
                          {testDrive.car}
                      </Link>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(testDrive._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <h2>Мои автомобили</h2>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Бренд</th>
              <th>Модель</th>
              <th>Год</th>
              <th>Пробег, км.</th>
              <th>Фотография</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userCars.map((car) => (
              <tr key={car._id}>
                <td>{car._id}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.mileage}</td>
                <td>
                  <img src={car.image} alt={car.brand} height='50' />
                </td>
                <td>
                  <Button variant='light' className='btn-sm' onClick={() => handleUpdate(car)}>
                    <i className='fas fa-edit'></i>
                  </Button>
                  <Button variant='danger' className='btn-sm' onClick={() => handleDelete(car._id)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h2>Добавить/обновить автомобиль</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='brand'>
            <Form.Label>Бренд</Form.Label>
            <Form.Control
              type='text'
              placeholder='Введите бренд'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="model">
            <Form.Label>Модель</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите модель"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="year">
            <Form.Label>Год</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите год выпуска"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="mileage">
            <Form.Label>Пробег</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите пробег, км."
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Фотография</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button type='submit' variant='primary'>
            Добавить
          </Button>
        </Form>

        
        
      </Col>
    </Row >
  );
}

export default ProfileScreen;
