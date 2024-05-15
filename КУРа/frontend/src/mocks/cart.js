import axios from "axios";
class CartAPI {
  async fetchProduct(carId) {
    try {
      const { data } = await axios.get(`/api/cars/${carId}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

const cartAPI = new CartAPI();

export default cartAPI;


