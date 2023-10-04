import React from "react";
import Alert from "@mui/material/Alert";

import "./AlertMessage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsVisible,
  selectMessage,
  selectSeverity,
  setAlert,
} from "./AlertSlice";
const AlertMessage = () => {
  const isVisible = useSelector(selectIsVisible);
  const message = useSelector(selectMessage);
  const severity = useSelector(selectSeverity);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setAlert({ message: "", severity: "info", isVisible: false }));
  };

  return (
    <>
      {isVisible && (
        <div className="alert-message">
          <Alert variant="filled" severity={severity} onClose={handleClose}>
            {message}
          </Alert>
        </div>
      )}
    </>
  );
};

export default AlertMessage;
