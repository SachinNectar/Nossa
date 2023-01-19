import React from "react";
import Select from "react-select";
import { FormModel } from "../../model/FormModel";
import { Row, Col, Form } from "react-bootstrap";

export const SelectField = ({
  label,
  placeholder,
  handleChange,
  id,
  mendetory,
  options = [],
  clearable = false,
  onInputChange = () => {},
  formName,
  error,
  value = {},
}) => {
  return (
    <Form.Group controlId={id} className="mb-3">
      <>
        {label && <Form.Label>{label}</Form.Label>}
        {mendetory && <span style={{ color: "red" }}> *</span>}
        <Select
          onChange={(data) =>
            handleChange
              ? handleChange(data, id)
              : new FormModel(formName)._update({ [id]: data })
          }
          options={options}
          isClearable={clearable}
          placeholder={placeholder}
          onInputChange={(data) => onInputChange(data)}
          value={value[id] || ""}
        />
      </>
    </Form.Group>
  );
};
