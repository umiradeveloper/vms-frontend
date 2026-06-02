"use client";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import Router from "next/router"; // untuk pages router
import { useRouter } from "next/router";
import Swal from "sweetalert2";
// Untuk App Router: pakai window.location.href

const AxiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const swalAlert = (message, title, icon) => {
		let timerInterval;

		Swal.fire({
			title: title,
			html: message,
			icon: icon,
			timer: 5000,
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading();
			},
			willClose: () => {
				clearInterval(timerInterval);
			},
		}).then((result) => {
			/* Read more about handling dismissals below */
			if (result.dismiss === Swal.DismissReason.timer) {
				console.log("I was closed by the timer");
			}
		});
}
AxiosConfig.interceptors.request.use(
  async (config) => {

    const session = await getSession();

    if (session?.accessToken) {

      config.headers = config.headers || {};

      config.headers.Authorization =
        `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
// Interceptor Response
AxiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      // Hapus token (localStorage)
      
      if (typeof window !== "undefined") {
        signOut();
        localStorage.clear();
       
      }

    
    }
    if (error.response?.status === 400) {
      console.log(error)
      if(error.response.data.violations?.length > 0){
        swalAlert(error.response.data.violations.map(v => `${v.field.split('.').pop()} ${v.message}`).join(', '), error.response.status, "error");
      }else{
        swalAlert(error.response.data.message, error.response.status, "error");
      }
      
    }
    if (error.response?.status === 500) {
      swalAlert("Kesalahan server", error.response.status, "error");
    }

    return Promise.reject(error);
  }
);

export default AxiosConfig;