import React,{useContext} from "react";
import "./UserPolicy.style.css";
import invoice from "../../images/invoice.png"





const SucessModal = (props) => {

 const handleSucessBack = () =>{
  props.handleSucessBack()
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
                <img src={invoice} alt="" width="20px"/>
              </div>
              <h2>Premium Paid successfully</h2>
            </div>
            <div className="modal-footer">
              {/* <UserContext.Consumer> */}
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleSucessBack} 
              >
                Close
              </button>
              {/* </UserContext.Consumer> */}
              <button type="button" className="btn btn-primary">
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SucessModal;
