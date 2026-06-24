import axios from "axios";

const API =
  "http://localhost:5000/api/profile";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const getProfile =
  async () => {
    const res = await axios.get(
      API,
      authHeader()
    );

    return res.data;
  };

export const updateProfile =
  async (data) => {
    const res = await axios.put(
      API,
      data,
      authHeader()
    );

    return res.data;
  };

export const changePassword =
  async (data) => {
    const res = await axios.put(
      `${API}/password`,
      data,
      authHeader()
    );

    return res.data;
  };