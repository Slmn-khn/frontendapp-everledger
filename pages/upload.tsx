/**
 *-------------------------------------------------------------------------------------------------------------------
 * FILE: upload.tsx
 * PACKAGE: pages
 * AUTHOR: Mohammed SalmanKhan M A
 * DATE: 03/21/2021
 * VERSION: 0.1
 * ABSTRACT: This page contains design and business logic to upload image.
 * HISTORY: - Mohammed SalmanKhan M A - created fist cut of the code.
 * -------------------------------------------------------------------------------------------------------------------
 */

// React imports to manage state and to handle callback
import { useState, useCallback, useEffect } from "react";

//axios to send date
import axios from "axios";

//styles: global style sheet
import styles from "../styles/index.module.css";

//To display success or error message
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//React material elements for beautifications
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

// button styles
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    backgroundColor: "#1f3340",
    color: "white",
  },
}));

export default function Upload() {
  const classes = useStyles();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [responseForUpload, setResponseForUpload] = useState(null);
  const [imageValidation, setImageValidation] = useState(true);
  const [copied, setCopied] = useState(false);

  //To copy data in clipboard
  const useCopyToClipboard = (text) => {
    const copyToClipboard = (str) => {
      const el = document.createElement("textarea");
      el.value = str;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      const success = document.execCommand("copy");
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
      return success;
    };

    const copy = useCallback(() => {
      if (!copied) setCopied(copyToClipboard(text));
    }, [text]);
    useEffect(() => () => setCopied(false), [text]);

    return [copied, copy];
  };

  const TextCopy = (props) => {
    const [copied, copy] = useCopyToClipboard(props.props);
    return (
      <div>
        <img
          src="/copy.png"
          alt="dummy"
          width="20"
          height="20"
          style={{ marginTop: "10px", marginLeft: "20px" }}
          onClick={() => copy}
        />
        <span>{copied && "Copied!"}</span>
      </div>
    );
  };

  //To handle uploaded file
  const handleChange = (e) => {
    var tmp = e.target.files[0].type;
    tmp = tmp.split("/");
    if (tmp[0] === "image" && e.target.files.length) {
      setImageValidation(true);
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    } else {
      setImageValidation(false);
    }
  };

  //To send the file to api
  async function submitUpload() {
    const formData = new FormData();
    formData.append("file", image.raw);
    formData.append("expires", "1h");

    var res = await axios({
      method: "post",
      url: "https://api.anonymousfiles.io/",
      data: formData,
    })
      .then(function (response) {
        setResponseForUpload({
          name: response.data.name,
          url: response.data.url,
          size: response.data.size,
        });
        toast.success("Image uploaded to anonymousfiles.io", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(function (error) {
        setUploadPercentage(0);
        toast.error("Image was not uploaded to anonymousfiles.io", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  return (
    <div className={styles.uploadMain}>
      <label htmlFor="upload-button">
        {image.preview ? (
          <img src={image.preview} alt="dummy" width="400" height="400" />
        ) : (
          <img src="/upload.png" alt="dummy" width="100" height="100" />
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <br />
      <div>
        {responseForUpload === null ? (
          <div>
            {image.preview ? (
              <Button
                className={classes.button}
                variant="contained"
                color="default"
                startIcon={<CloudUploadIcon />}
                onClick={() => submitUpload()}
              >
                Upload
              </Button>
            ) : (
              <div>
                {!imageValidation ? (
                  <label style={{ color: "red" }}>
                    Please upload a image file
                  </label>
                ) : (
                  <label style={{ color: "black" }}>
                    Click on icon to load image
                  </label>
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ToastContainer />
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ color: "black", fontSize: "20px" }}>
                Name: {responseForUpload.name}
              </label>
              <TextCopy props={responseForUpload.name} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ color: "black", fontSize: "20px" }}>
                Url: {responseForUpload.url}
              </label>
              <TextCopy props={responseForUpload.url} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
