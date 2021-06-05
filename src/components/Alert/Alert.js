import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./Alert.scss";

const toastConfigObject = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
};

toast.configure(toastConfigObject);

export const Alert = (msg, type = "error", id = 1) =>
  toast(msg, { className: type, toastId: id });
