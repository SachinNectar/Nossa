import React from "react";
// import "./UserPolicy.style.css";
import invoicestar from "../../assets/img/invoicestar.png"





const ApprovalModal = (props) => {

 const handleSucessBack = () =>{
  props.handleBack()
 }

  return (

          <div className="invoice-start-box">
      <div
        
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document" style={{paddingTop:"50px"}}
        >
          <div className="modal-content">
            <div className="modal-body">
              <div className="invoice-star">
                <img src={invoicestar} alt="" width="20px"/>
              </div>
              <h2>Complaint Approved successfully</h2>
            </div>
            <div className="modal-footer">
              {/* <UserContext.Consumer> */}
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleSucessBack} 
              >
                Done
              </button>
              {/* </UserContext.Consumer> */}
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApprovalModal;
