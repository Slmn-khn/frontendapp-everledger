/**
 *-------------------------------------------------------------------------------------------------------------------
 * FILE: index.tsx
 * PACKAGE: pages
 * AUTHOR: Mohammed SalmanKhan M A
 * DATE: 03/13/2021
 * VERSION: 0.1
 * ABSTRACT: This page is the entry point applciation i.e this is the landing page.
 * HISTORY: - Mohammed SalmanKhan M A - created fist cut of the code.
 * -------------------------------------------------------------------------------------------------------------------
 */

import { useState } from "react";
//Link: to enable routing seamleassly
import Link from "next/link";

//styles: global style sheet
import styles from "../styles/index.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

//To display success or error message
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// button styles
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    backgroundColor: "#1f3340",
    color: "white",
  },
}));

function Backend() {
  const classes = useStyles();
  const [color, setColor] = useState("");
  const [cut, setCut] = useState("");
  const [clarity, setClarity] = useState("");
  const [caratWeight, setCaratWeight] = useState(0);
  const [response, setReponse] = useState(null);

  async function submitForm() {
    console.log(color, cut, clarity, caratWeight);

    if (color === "") {
      toast.error("Please fill the missing fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (cut === "") {
      toast.error("Please fill the missing fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (clarity === "") {
      toast.error("Please fill the missing fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (caratWeight <= 0) {
      toast.error("Please enter a positive", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const res = await fetch("/api/health", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: color,
          cut: cut,
          clarity: clarity,
          caratWeight: caratWeight,
        }),
      }).then(async function (response) {
        console.log("response", response);
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setReponse(data.valueinHex);
          toast.success("hex has been generated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }
  }

  async function checkHealth() {
    const res = await fetch("/api/health", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async function (response) {
      console.log("response", response);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        toast.success(JSON.stringify(data), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  }

  return (
    <div className={styles.backendMain}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label
          style={{ color: "black", fontSize: "24px", marginBottom: "40px" }}
        >
          Health Check
        </label>
        <input
          type="button"
          name="submit"
          value="Check Health"
          onClick={checkHealth}
        />
      </div>
      <div style={{ marginTop: "3%" }}>
        <label
          style={{ color: "black", fontSize: "24px", marginBottom: "40px" }}
        >
          POST API
        </label>
        <form className={styles.attributesInput}>
          <label>Color</label>
          <input
            type="text"
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
          <label>Cut</label>
          <input
            type="text"
            name="color"
            value={cut}
            onChange={(e) => setCut(e.target.value)}
            required
          />
          <label>Clarity</label>
          <input
            type="text"
            name="color"
            value={clarity}
            onChange={(e) => setClarity(e.target.value)}
            required
          />
          <label>CaratWeight</label>
          <input
            type="number"
            name="color"
            value={caratWeight}
            onChange={(e) => setCaratWeight(parseInt(e.target.value))}
            required
          />
          <input
            type="button"
            name="submit"
            value="Submit"
            onClick={submitForm}
          />
          {response !== null ? (
            <label
              style={{ color: "black", fontSize: "20px", marginTop: "20px" }}
            >
              {JSON.stringify(response)}
            </label>
          ) : null}

          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
export default Backend;
