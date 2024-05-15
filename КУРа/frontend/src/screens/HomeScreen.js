// В файле HomeScreen.js

import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Car from "../components/Car";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CarCarousel from "../components/CarCarousel";
import { fetchCarList } from "../redux/slices/carSlice";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const carList = useSelector((state) => state.car.carList);

  const { cars, loading, error, page, pages } = carList;
  const { pageNumber } = useParams();
  console.log(carList);
  let keyword = history.location.search;
  console.log(keyword);
  useEffect(() => {
    dispatch(fetchCarList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      {!keyword && (
        <>
          <CarCarousel currentPage={page} /> {/* Передаем текущую страницу в слайдер */}
        </>
      )}

      <div style={{ fontWeight: "bold", fontSize: "40px", color: "black", fontFamily: "MozAnimationDelay", textAlign: "center", marginBottom: "2vw" }}>Каталог</div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {cars.map((car) => (
              <Col key={car._id} sm={12} md={6} lg={4} xl={3}>
                <Car car={car} />
              </Col>
            ))}
          </Row>
        </div>
      )}
      <Paginate page={page} pages={pages} keyword={keyword} />
    </div>
  );
}

export default HomeScreen;
