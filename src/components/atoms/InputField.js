import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FormModel } from "./../../model/FormModel";

export const InputField = ({
  label,
  type = "text",
  placeholder,
  handleChange,
  id = "",
  mendetory,
  maxLength,
  max,
  suffixIcon,
  value = {},
  formName,
  disabled = false,
  className = "",
}) => {
  const error = value?.validation?.[id];
  const [inputType, setInputType] = useState(type);

  const input = () => {
    switch (type) {
      case "checkbox":
        return <Form.Check type="checkbox" label={label} />;

      case "password":
        return (
          <>
            {label && <Form.Label>{label}</Form.Label>}
            {mendetory && <span style={{ color: "red" }}> *</span>}
            <div className="input-group">
              <Form.Control
                type={inputType}
                placeholder={placeholder}
                maxLength={maxLength}
                disabled={disabled}
                onChange={(e) =>
                  handleChange
                    ? handleChange(e, id)
                    : new FormModel(formName)._update({ [id]: e.target.value })
                }
                value={value[id]}
              />
              <span
                className="input-group-text border-left-0"
                id="confirm-password"
                onClick={() =>
                  setInputType(inputType === "password" ? "text" : "password")
                }
              >
                {inputType === "password" ? (
                  <i className={`fa fa-eye`}></i>
                ) : (
                  <i className={`fa fa-eye-slash`}></i>
                )}
              </span>
            </div>
          </>
        );

      case "textarea":
        return (
          <>
            {label && <Form.Label>{label}</Form.Label>}
            {mendetory && <span style={{ color: "red" }}> *</span>}
            <Form.Control
              as="textarea"
              rows={2}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              onChange={(e) =>
                handleChange
                  ? handleChange(e, id)
                  : new FormModel(formName)._update({ [id]: e.target.value })
              }
              value={value[id]}
            />
          </>
        );

      case "number":
        return (
          <>
            {label && <Form.Label>{label}</Form.Label>}
            {mendetory && <span style={{ color: "red" }}> *</span>}
            <Form.Control
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              max={max}
              onChange={(e) =>
                handleChange
                  ? handleChange(e, id)
                  : new FormModel(formName)._update({ [id]: e.target.value })
              }
              value={value[id]}
            />
          </>
        );

      default:
        return (
          <>
            {label && <Form.Label>{label}</Form.Label>}
            {mendetory && <span style={{ color: "red" }}> *</span>}
            <Form.Control
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              onChange={(e) =>
                handleChange
                  ? handleChange(e, id)
                  : new FormModel(formName)._update({ [id]: e.target.value })
              }
              value={value[id]}
            />
          </>
        );
    }
  };

  return (
    <Form.Group controlId={id} className={`mb-3 ${className}`}>
      {input()}
      {error && <p className="errorText">{error}</p>}
    </Form.Group>
  );
};
