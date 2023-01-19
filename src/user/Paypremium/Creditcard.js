import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form'
import moment from "moment";
import { InputField } from "../../components/atoms/InputField";
//import { addBankDetails, getClientDetailsByToken } from "../../services/client";
//import { showAlert } from "../.././utils/showAlert";
import { getCardType, maskCharacter } from "../.././utils/validators";
import DeleteConfirmationModal from "../../components/atoms/DeleteConfirmationModal";
import { useNavigate } from "react-router-dom";
import {Creditcardinfo} from "../../services/authentication"
import {ArrowLeftOutlined} from "@ant-design/icons";
import SucessModal from "../Paypremium/SucessModal"
import credit from "../../assets/img/credit.png"

function CreditCard(props) {
  const data = props.selectedRecord;
  console.log("nagasai",data)
  const [cardBtnLoading, setCardBtnLoading] = useState();
  const [showCCDetails, setShowCCDetails] = useState();
  const [creditCardpage,setCreditCardPage] = useState(true);
  const [successPage,setSuccessPage] = useState(false)
  const [showCCForm, setShowCCForm] = useState(true);
  const [showAddCC, setShowAddCC] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [cardId, setCardId] = useState();
  

  const navigate = useNavigate();
  const year = (new Date()).getFullYear();
  const years = Array.from(new Array(20),(val, index) => index + year);

  const handleSucessBack = () =>{
    setCreditCardPage(true)
    setSuccessPage(false)
  }

  const handleBack = () =>{
    props.handleBackToUserPolicy()
  }

  const [cardDetails, setCardDetails] = useState({
    num1: "",
    num2: "",
    num3: "",
    num4: "",
    cardName: "",
    expMonth: moment().format("MM"),
    expYear: year,
    cvv: "",
  });
  const { num1, num2, num3, num4, cardName, expMonth, expYear , cvv } = cardDetails;

  const [ccDetail, setCCDetail] = useState([]);
  const [finishDisable, setFinishDisable] = useState(true);

  const disableCardBtn =
    !num1 ||
    !num2 ||
    !num3 ||
    !num4 ||
    !cardName ||
    !cvv ||
    cardBtnLoading;
  
    useEffect(() => {     
    //   (async () => {
    //     const response = await getClientDetailsByToken();
    //     const cardData = response?.result?.cardDetails;
    //     if(cardData.length) {
    //       setFinishDisable(false)
    //       setCCDetail(cardData)
    //       setShowCCForm(false)
    //       setShowCCDetails(true)
    //       setShowAddCC(true)
    }, []);

  const saveCardDetails = async () => {
    const cardNumber = `${num1}${num2}${num3}${num4}`;
    const validTill = `${expYear}-${expMonth}-01`
    
    const expDate = moment(validTill).endOf('month').format("YYYY-MM-DD")
    const todayDate = moment().format("YYYY-MM-DD")

    // if(isNaN(cardNumber)) {
    //     showAlert("Invalid Credit card number", "error");
    //     return;
    // }
    // if(cardNumber.length !== 16) {
    //   showAlert("Credit card number must be of 16 digits", "error");
    //   return;
    // }
    if(!getCardType(cardNumber)) {
      //showAlert("Invalid Credit card number. Only Visa & Mastercards allowed.", "error");
      return;
    }
    if(isNaN(cvv)) {
     // showAlert("Invalid CVV", "error");
      return;
    }
    if(moment(todayDate).isAfter(expDate)){
     // showAlert("Expiry date should be a future date", "error");
      return;
    }
    const ccData = {
        number: Number(cardNumber),
        name: cardName,
        validTill: moment(validTill).endOf('month').format("MM-DD-YYYY"), 
        cvv, 
    }
    const data = (ccDetail.length === 0) 
                ? { operation: "add", cardDetails: { ...ccData, defaultValue: true} }
                : { operation: "add", cardDetails: ccData }
               console.log("nagasai",props);
                const handleCreditCardAPI = async (addCreditcard) =>{
                  const data= {
                  id:"",
                 paymentType:"online",
                 paymentStatus:"suscess",
                 paymentDate:"2022-01-13 12:54:00"
                   }
                  try {
                    // const resp = await Creditcardinfo (data);
                    // handleGetAgentListServiceCall()
                    // handleCancel()
                  } catch (error) {
                      console.log('error',error)
                    // showAlert('In valide data', "error");
                  }
                }
              
    // try {
    //   setCardBtnLoading(true);
    //  // const resp = await addBankDetails(data);
    //   const cardData = resp?.data?.result?.cardDetails;
    //   cardData?.length && setFinishDisable(false)
    //   setCCDetail(cardData);
    //   showAlert("Card details saved.", "success");
    //   setShowCCDetails(true);
    //   setShowAddCC(true);
    //   setShowCCForm(false);
    // } catch (error) {
    //   showAlert("Error in saving details.", "error");
    // } finally {
    //   setCardBtnLoading(false);
    // }
  };

  const setDefault = async (id) => {
    const data = {
        operation: "default",
        cardDetails: {
            _id: id
        }
    }

//     try {
//        // const resp = await addBankDetails(data);
//         const cardData = resp?.data?.result?.cardDetails;
//         setCCDetail(cardData);
//         showAlert("Default credit card saved.", "success");
//     } catch (error) {
//         showAlert("Error in saving default credit card.", "error");
//     } finally {
//         // setBankBtnLoading(false);
//     }
  }

  const deleteAccount = async (id) => {
    const data = {
        operation: "delete",
        cardDetails: {
            _id: id
        }
    }

//     try {
//        // const resp = await addBankDetails(data);
//         const cardData = resp?.data?.result?.cardDetails;
//         setCCDetail(cardData);
//         showAlert("Credit card deleted.", "success");
//     } catch (error) {
//         showAlert("Error in deleting Credit card.", "error");
//     } finally {
//         // setBankBtnLoading(false);
//     } 
  }

  const handlePaymentServiceCall = async() =>{
    const payLoad= {
      //id:data.key,
      id:1,
      paymentType:"online",
      paymentStatus:"success",
      paymentDate:"2022-01-13 12:54:00"
     }
    try {
      const resp = await Creditcardinfo(payLoad);
      setCreditCardPage(false)
      setSuccessPage(true)
    } catch (error) {
        console.log('error',error)
      // showAlert('In valide data', "error");
    }
  }

  return (
    <>
    {creditCardpage &&<div>
        <div>
        <a
          style={{
            marginTop:'50px',
            marginBottom:"50px"


           }}
          onClick={() => handleBack()}
        >
          <ArrowLeftOutlined style={{paddingTop:"10px"}}/> BACK
        </a>
      </div>
      {showCCDetails &&
        ccDetail.map((cc) => (
          <div key={cc._id} className="card card-body bg-light mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <div className="form-check mr-2">
                  <label className="form-check-label text-muted">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="ccradio"
                      checked={cc?.defaultValue === true}
                      onClick={() => {
                          !cc?.defaultValue && setDefault(cc._id)
                        }}
                    />
                  </label>
                </div>
                <div>
                    <p className="mb-0"><strong>{cc.name}</strong></p>
                    <p className="mb-0">Credit Card No. <span className="text-info">{maskCharacter(cc.number)}</span></p>
                </div>
                {
                  getCardType(cc.number) === "Visa" ?
                  <img src={credit} className="img-fluid ml-3" /> : 
                  <img src={credit} className="img-fluid ml-3" /> 
                }
                                 
                </div>

                { !cc?.defaultValue && (
                    <div 
                        className="delete-icon"
                        style={{cursor:"pointer"}} 
                        onClick={() => {
                            setShowDeleteModal(true)
                            setCardId(cc._id)
                        }}
                    >
                        <i className="far fa-trash-alt"></i>
                    </div>
                    )
                }
              </div>
            </div>
        ))}

      {showAddCC && (
        <a
          className="text-info"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowCCForm(true);
            setShowAddCC(false);
            setCardDetails({
              num1: "",
              num2: "",
              num3: "",
              num4: "",
              cardName: "",
              expMonth: moment().format("MM"),
              expYear: year,
              cvv: "",
            });
          }}
        >
          <i className="fas fa-plus"></i> Add another Credit card Details
        </a>
      )}

      {showCCForm && (
        <>
          {/* <p className="text-info">
            * This card will be used for your future subscriptions plan payments
          </p> */}
          <div className="row">
            <div className="col-md-12">
              <label>Add 16 digit Credit Card number </label>
              <span style={{ color: "red" }}> *</span>
            </div>
            <div className="form-group col-md-3">
              <InputField
                // type="number"
                id="num1"
                placeholder="****"
                value={cardDetails}
                maxLength="4"
                handleChange={(e) =>
                  setCardDetails({ ...cardDetails, num1: e.target.value })
                }
              />
            </div>
            <div className="form-group col-md-3">
              <InputField
                id="num2"
                placeholder="****"
                value={cardDetails}
                maxLength="4"
                handleChange={(e) =>
                  setCardDetails({ ...cardDetails, num2: e.target.value })
                }
              />
            </div>
            <div className="form-group col-md-3">
              <InputField
                id="num3"
                placeholder="****"
                value={cardDetails}
                maxLength="4"
                handleChange={(e) =>
                  setCardDetails({ ...cardDetails, num3: e.target.value })
                }
              />
            </div>
            <div className="form-group col-md-3">
              <InputField
                id="num4"
                placeholder="****"
                value={cardDetails}
                maxLength="4"
                handleChange={(e) =>
                  setCardDetails({ ...cardDetails, num4: e.target.value })
                }
              />
            </div>
          </div>

          <Row>
            <Col md={12}>
              <InputField
                label="Name mentioned on Credit Card"
                id="cardName"
                mendetory
                value={cardDetails}
                handleChange={(e) =>
                  setCardDetails({ ...cardDetails, cardName: e.target.value })
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={2}>
                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                  <Form.Label>Expiry month</Form.Label>
                  <Form.Control 
                    value={expMonth}
                    as="select" 
                    size="sm" 
                    custom="custom"
                    onChange={(e) => setCardDetails({ ...cardDetails, expMonth: e.target.value })}
                  >
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </Form.Control>
                </Form.Group>              
            </Col>
            <Col md={2}>
                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                  <Form.Label>Expiry year</Form.Label>
                  <Form.Control 
                    value={expYear}
                    as="select" 
                    size="sm" 
                    custom="custom"
                    onChange={(e) => setCardDetails({ ...cardDetails, expYear: e.target.value })}>
                  {
                    years.map((year, index) => {
                      return <option key={`year${index}`} value={year}>{year}</option>
                    })
                  }
                  </Form.Control>
                </Form.Group>              
            </Col>
            <Col md={3}>
              <InputField
                label="Enter CVV"
                id="cvv"
                mendetory
                type="password"
                maxLength="3"
                value={cardDetails}
                placeholder="***"
                handleChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
              />
            </Col>
            <Col md={3}>
              <img src={credit} className="img-fluid mt-4"  style={{paddingTop:"20px"}}/>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              {/* <Button
                disabled={disableCardBtn}
                variant="primary"
                className="blue_btn"
                onClick={saveCardDetails}
              >
                {cardBtnLoading ? "Saving..." : "Update & Save card"}
              </Button> */}
            </Col>
          </Row>
        </>
      )}
      <div className="my-3 text-right">
        <Button
          disabled={false}
          variant="primary"
          className="blue_btn mr-2"
          onClick={() => handlePaymentServiceCall()}
        >
          Proceed to Payment
        </Button>
      </div>

      <DeleteConfirmationModal
        label="Are you sure you want to delete this item?"
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          deleteAccount(cardId)
          setShowDeleteModal(false)
        }}
      />
      </div>}
      {successPage && <SucessModal handleSucessBack={handleSucessBack}/>}
    </>
  );
}

export default CreditCard;
