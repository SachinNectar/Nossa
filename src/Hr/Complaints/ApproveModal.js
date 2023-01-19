import React from "react";
 import './Style.css'


const ApprovalModal = (props) =>{
    return(
        <div className="invoice-start-box">
        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="invoice-star">
                            <img src="images/invoice-star.png" alt="" width="20px" />
                        </div>
                        <h6>Approved Succesfully</h6>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" handleBack={props.handleDone}>Done</button>
                        
                    </div> */}
                </div>
            </div>
        </div>
    </div>
    )
}
export default ApprovalModal;