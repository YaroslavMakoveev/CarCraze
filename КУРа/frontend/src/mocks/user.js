import axios from 'axios';

class UserAPI {
  async getUserDetails( ) {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/users/`, config);
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async createUser(name, email, password) {
    try {
 
      const config = {
        headers: {
          'Content-Type': 'application/json',
         
        }
      };
  
      const { data } = await axios.post('/api/users/register/', { name, email, password }, config);
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
  

  async updateUser(userId, updateData) {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(`/api/users/profile/update/`, updateData, config);
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async deleteUser(userId) {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/api/users/delete/${userId}/`, config);
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async login(email, password) {
    try {
      const { data } = await axios.post('/api/users/login/',{ username: email, password: password });
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async getUserCars(token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/users/cars/`, config);
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async createUserCar(token, carData) {
    try {
      const formData = new FormData();
      formData.append('brand', carData.brand);
      formData.append('model', carData.model);
      formData.append('year', carData.year);
      formData.append('mileage', carData.mileage);
      formData.append('image', carData.image);
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      };
  
      const { data } = await axios.post(`/api/users/cars/create/`, formData, config);
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
  
  async updateUserCar(token, carId, carData) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(`/api/users/cars/${carId}/update/`, carData, config);
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async deleteUserCar(token, carId) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/api/users/cars/${carId}/delete/`, config);
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

}

const userAPI = new UserAPI();

export default userAPI;
