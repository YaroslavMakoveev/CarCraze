import axios from 'axios';

class CarAPI {
  async getCarList(keyword= '' , pageNumber = '') {
    try {
      const { data } = await axios.get(`/api/cars${keyword}`, {
        params: {
       
          page: pageNumber
        }
      });
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
  
  async getCarDetails(carId) {
    try {
      const { data } = await axios.get(`/api/cars/${carId}`);
      console.log(data)
      return data;      
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
}

const carAPI = new CarAPI();

export default carAPI;
