import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/auth`;

export const registerUser =
  async (data) => {
    const response =
      await axios.post(
        `${API}/register`,
        data
      );

    return response.data;
  };

export const loginUser =
  async (data) => {
    const response =
      await axios.post(
        `${API}/login`,
        data
      );

    return response.data;
  };

export const sendOtp =
  async (email) => {
    const response =
      await axios.post(
        `${API}/send-otp`,
        { email }
      );

    return response.data;
  };

export const verifyOtp =
  async (data) => {
    const response =
      await axios.post(
        `${API}/verify-otp`,
        data
      );

    return response.data;
  };

export const resetPassword =
  async (data) => {
    const response =
      await axios.post(
        `${API}/reset-password`,
        data
      );

    return response.data;
  };