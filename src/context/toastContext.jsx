import { Children, createContext, useContext, useState } from "react";
import MySnackBar from "../components/snackbar";

const ToastContext = createContext({});

export const TaostProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <MySnackBar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
