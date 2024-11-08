import React, { useState, useEffect, useRef, useContext } from "react";
import DatePicker from "react-datepicker"; // Import DatePicker from react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import the default styles for DatePicker
import css from "./serviceform.module.css"; // Import the CSS module
import { GlobalContextForApp } from "../../store/authentiation-store.jsx";

const ServiceForm = () => {
  const [any_message, setany_message] = useState({ message: "", type: "" });
  const subjectNameRef = useRef();
  const descriptionRef = useRef();
  const fileInputRef = useRef();
  const amountRef = useRef();
  const currencyRef = useRef();
  const [files, setFiles] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());

  const SUPPORTED_CURRENCIES = [
    "USD",
    "AUD",
    "BRL",
    "CAD",
    "CNY",
    "CZK",
    "DKK",
    "EUR",
    "HKD",
    "HUF",
    "ILS",
    "JPY",
    "MYR",
    "MXN",
    "TWD",
    "NZD",
    "NOK",
    "PHP",
    "PLN",
    "GBP",
    "SGD",
    "SEK",
    "CHF",
    "THB",
  ];

  const { isAuthenticated, setisAuthenticated, setuserMainComponant } =
    useContext(GlobalContextForApp);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) => {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      return allowedTypes.includes(file.type);
    });
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subjectName = subjectNameRef.current.value;
    const description = descriptionRef.current.value;
    const amount = amountRef.current.value;
    const currency = currencyRef.current.value;

    const formData = new FormData();
    formData.append("subject", subjectName); // Updated field name
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("currency", currency);
    formData.append("deadline", dateTime.toISOString());

    // Append each file to the form data under the 'files' key
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(
        "http://43.204.218.60/api_new/assignments/submit/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setany_message({
          message:
            "Submission successful you will get response from our expert",
          type: "success",
        });
      } else {
        console.log(data);
        setany_message({
          message: "Submission failed!",
          type: "error",
        });
      }
    } catch (err) {
      setany_message({
        message: "Network error. Please try again later",
        type: "error",
      });
    }
  };

  const formatFileName = (file) => {
    const name = file.name.split(".").slice(0, -1).join(".");
    const extension = file.name.split(".").pop();
    const formattedName = name.length > 5 ? `${name.slice(0, 5)}..` : name;
    return `${formattedName}.${extension}`;
  };

  const handlePreviewFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  return (
    <>
      <div className={css.overlay}>
        <button
          onClick={() => setuserMainComponant("")}
          className={css.closeBtn}
        >
          &times;
        </button>
        <div className={css.formContainer}>
          <h2>Submitter</h2>
          <form onSubmit={handleSubmit}>
            <div className={css.formGroup}>
              <p
                className={css.any_message}
                style={
                  any_message.type == "success"
                    ? { color: "green" }
                    : any_message.type == "error"
                    ? { color: "red" }
                    : null
                }
              >
                {any_message.message}
              </p>
              <label>Subject Name:</label>
              <input type="text" ref={subjectNameRef} required />
            </div>
            <div className={css.formGroup}>
              <label>Description:</label>
              <textarea ref={descriptionRef} required></textarea>
            </div>
            <div className={css.formGroup}>
              <label>File to Upload:</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                accept=".jpg,.jpeg,.png,.gif,.doc,.docx,.txt,.pdf"
              />
            </div>
            <div className={css.row}>
              <div>
                <label>Deadline:</label>
                <DatePicker
                  selected={dateTime}
                  onChange={(date) => setDateTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className={css.dateTimeInput}
                  required
                />
              </div>
              <div>
                <label>Total Amount</label>
                <div className={css.currencyContainer}>
                  <input
                    type="number"
                    placeholder="Amount"
                    className={css.amountInput}
                    ref={amountRef}
                    required
                  />
                  <select
                    ref={currencyRef}
                    className={css.currencySelect}
                    required
                  >
                    {SUPPORTED_CURRENCIES.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" className={css.submitBtn}>
              Submit
            </button>
          </form>
          <div className={css.filePreview}>
            {files.length > 0 && <h3>Uploaded Files:</h3>}
            <div className={css.previewContainer}>
              {files.map((file, index) => (
                <div
                  key={index}
                  className={css.previewCard}
                  onClick={() => handlePreviewFile(file)}
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={formatFileName(file)}
                      className={css.imagePreview}
                    />
                  ) : (
                    <div className={css.fileIcon}>
                      <p>{formatFileName(file)}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceForm;
