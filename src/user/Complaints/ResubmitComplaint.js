import React from "react"
//no need


const ResubmitComplaint = () =>{
    return(
        <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content popup-form">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Resubmit Complaint</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label name="Complaint-ID" className="col-form-label">Complaint ID</label>
                            <input type="text" className="form-control" id="Complaint-ID" placeholder=""/>
                        </div>
                        <div className="form-group">
                            <label name="Policy" className="col-form-label">Policy</label>
                            <input type="text" className="form-control" id="Policy" placeholder=""/>
                        </div>
                        <div className="form-group">
                            <label name="Policy-Premium" className="col-form-label">Subject</label>
                            <input type="text" className="form-control" id="Policy-Premium" placeholder=""/>
                        </div>
                        <div className="form-group">
                            <label name="message-text" className="col-form-label">Complaint Description</label>
                            <textarea className="form-control" id="message-text"></textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
     
    )
}
export default ResubmitComplaint