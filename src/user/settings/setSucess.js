import React from "react";
import invoicestar from "../.././assets/img/invoicestar.png"
import { useNavigate } from "react-router-dom";

const setSucess = (props) => {

  // let navigate = useNavigate();
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
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body">
              <div className="invoice-star">
                <img src={invoicestar} alt="" width="20px" />
              </div>
              <h2>Password Updated Sucessfully</h2>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                // onClick={()=>useNavigate("/")}
                onClick={() => props.handleback()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default setSucess;
