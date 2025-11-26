"use client";
import axios from "axios";
import Router from "next/router"; // untuk pages router
import { useRouter } from "next/router";
// Untuk App Router: pakai window.location.href

const AxiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});


// Interceptor Response
AxiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Hapus token (localStorage)
      if (typeof window !== "undefined") {
        // localStorage.removeItem("token");
        localStorage.removeItem("token");
        localStorage.removeItem("menu");
        localStorage.removeItem("user");
        Router.push("/apps/LoginRegister");
      }

      // Redirect ke login
    //   if (typeof window !== "undefined") {
    //     // window.location.href = "/login"; // universal, works both App/Pages router
    //   }
    }

    return Promise.reject(error);
  }
);

export default AxiosConfig;