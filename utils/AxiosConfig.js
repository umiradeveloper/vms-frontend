"use client";
import axios from "axios";
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