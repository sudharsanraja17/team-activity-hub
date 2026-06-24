import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/activities`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

/*
=========================
PUBLIC
=========================
*/

export const getPublicActivities =
  async () => {
    const res = await axios.get(
      `${API}/public`,
      authHeader()
    );

    return res.data;
  };

export const createPublicActivity =
  async (data) => {
    const res = await axios.post(
      `${API}/public`,
      data,
      authHeader()
    );

    return res.data;
  };

export const updatePublicActivity =
  async (id, data) => {
    const res = await axios.put(
      `${API}/public/${id}`,
      data,
      authHeader()
    );

    return res.data;
  };

export const deletePublicActivity =
  async (id) => {
    const res = await axios.delete(
      `${API}/public/${id}`,
      authHeader()
    );

    return res.data;
  };

/*
=========================
PRIVATE
=========================
*/

export const getPrivateActivities =
  async () => {
    const res = await axios.get(
      `${API}/private`,
      authHeader()
    );

    return res.data;
  };

export const createPrivateActivity =
  async (data) => {
    const res = await axios.post(
      `${API}/private`,
      data,
      authHeader()
    );

    return res.data;
  };

export const updatePrivateActivity =
  async (id, data) => {
    const res = await axios.put(
      `${API}/private/${id}`,
      data,
      authHeader()
    );

    return res.data;
  };

export const deletePrivateActivity =
  async (id) => {
    const res = await axios.delete(
      `${API}/private/${id}`,
      authHeader()
    );

    return res.data;
  };