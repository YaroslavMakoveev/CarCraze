import axios from "axios";

class TradeInAPI {
  createTradeIn = async (carId, userCarId, userId) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data: tradeInData } = await axios.post(
        `/api/trade-in/${carId}/`, // Используем новый маршрут с идентификатором автомобиля в URL
        { userId, carId, userCarId },
        config
      );
      return tradeInData;
      
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };

  listMyTradeIns = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/trade-in/`, config);

      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };

  async deleteTradeIn(tradeInId) {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.delete(`/api/trade-in/${tradeInId}/delete/`, config);
    } catch (error) {
      throw error;
    }
  }
}

const tradeInAPI = new TradeInAPI();

export default tradeInAPI;
