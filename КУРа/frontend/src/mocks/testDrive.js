// testDrive.js

import axios from "axios";

class TestDriveAPI {
  createTestDrive = async (carId, userId, date, time) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data: testDriveData } = await axios.post(
        `/api/test-drives/${carId}/`, // Используем новый маршрут с идентификатором автомобиля в URL
        { userId, carId, date, time },
        config
      );

      return testDriveData;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };

  listMyTestDrives = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/test-drives/`, config);

      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };

  async deleteTestDrive(testDriveId) {
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    await axios.delete(`/api/test-drives/${testDriveId}/delete/`, config);
  } catch (error) {
    throw error;
  }
}


}

const testDriveAPI = new TestDriveAPI();

export default testDriveAPI;
