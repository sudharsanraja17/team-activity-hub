import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  verifyOtp,
  resetPassword,
} from "../services/authService";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match"
      );
    }

    try {
      await verifyOtp({
        email: formData.email,
        otp: formData.otp,
      });

      await resetPassword({
        email: formData.email,
        otp: formData.otp,
        password: formData.password,
      });

      toast.success(
        "Password Reset Successful"
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Reset Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">
          Reset Password
        </h2>

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-3"
          onChange={handleChange}
          required
        />

        <input
          name="otp"
          placeholder="OTP"
          className="w-full border p-3 rounded mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="New Password"
          className="w-full border p-3 rounded mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;