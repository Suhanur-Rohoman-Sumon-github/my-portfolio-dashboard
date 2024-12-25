"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { FieldValues, useForm } from "react-hook-form";
import { CiLogin } from "react-icons/ci";
import { useRouter } from "next/navigation";
import useContexts from "@/hooks/useContext";

const Login = () => {
  const { handleLogin } = useContexts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Fetch the redirect URL from the query params

  const onSubmit = (data: FieldValues) => {
    const { email, password } = data;
    handleLogin(email, password)
      .then((result) => {
        router.push("/admin-home");
        const { accessToken } = result.user;
        localStorage.setItem("accessToken", accessToken);
        document.cookie = `accessToken=${accessToken}; Path=/; Secure; SameSite=Strict; Max-Age=86400`;
      })
      .catch((err) => {
        let errorMessage = "";
        switch (err.code) {
          case "auth/invalid-credential":
            errorMessage = "No user found. Please Register first.";
            break;
          case "auth/user-not-found":
            errorMessage = "User not found. Please check your email.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password. Please try again.";
            break;
          default:
            errorMessage = err.message;
        }
        setError(errorMessage);
      });
  };

  // Handle redirect on successful login

  return (
    <div>
      <div className="my-12 flex flex-col-reverse lg:flex-row justify-between items-center">
        <div className="flex justify-center w-full lg:w-2/5 mx-auto items-center mt-32">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 rounded-lg shadow-md w-full"
          >
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              User Login
            </h2>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your mail"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label className="block text-gray-600 mb-2" htmlFor="password">
                Password
              </label>
              <input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-12 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center"
            >
              Login <CiLogin className="font-bold text-xl" />
            </button>
            <p className="text-red-500 mt-4 text-center">{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
