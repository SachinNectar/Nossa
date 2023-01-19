import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FormModel } from "./../../model/FormModel";
import { InputField } from "./InputField";
import "./tokenized.style.css";

export const TokenizedBlock = ({ list, onRemove }) => {
  return (
    <div className="token-box">
      {list.map((item) => (
        <div className="token" key={item}>
          <div className="token-text">{item}</div>
          <div onClick={() => onRemove(item)} className="remove">
            <i className="fa fa-times" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const Tokenize = ({
  label,
  placeholder,
  id = "",
  mendetory,
  value = {},
  formName,
  disabled = false,
  handleChange,
}) => {
  const valueList = value[id] || [];

  const [inputValue, setValue] = useState();

  const inputProps = {
    disabled,
    label,
    placeholder,
    id,
    mendetory,
    value: { [id]: inputValue },
  };

  const updateList = (newList) => {
    if (handleChange) {
      handleChange(newList, id);
    } else {
      new FormModel(formName)._update({ [id]: newList });
    }
    setValue("");
  };

  const onAdd = () => {
    const newList = [...new Set([...valueList, inputValue])];
    updateList(newList);
  };

  const onRemove = (item) => {
    const newList = valueList.filter((instance) => instance !== item);
    updateList(newList);
  };

  return (
    <Form.Group controlId={id} className="mb-3">
      <div className="token-input-wrapper">
        <InputField
          {...inputProps}
          handleChange={(e) => setValue(e.target.value)}
          className="token-input"
        />
        <div className="add-button">
          <Button style={{ marginTop: "10px" }} onClick={onAdd}>
            Add
          </Button>
        </div>
      </div>
      <Row>
        <Col>
          <TokenizedBlock list={valueList} onRemove={onRemove} />
        </Col>
      </Row>
    </Form.Group>
  );
};


{/* <Row>
                  <Col md={6}>
                    <Tokenize
                      formName={formName}
                      label="Choose must have skills"
                      id="mainSkills"
                      value={values}
                    />
                  </Col>
                </Row> */}