import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'

function DeleteConfirmationModal({label, show, handleClose, onConfirm}) {
  return (
    <Modal show={show} onHide={handleClose} className="text-center p-3">
      <Modal.Header>
          <Modal.Title className="mb-1 mt-2"><strong>WANT TO DELETE</strong></Modal.Title>
          <button type="button" className="close" onClick={handleClose}><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
        </Modal.Header>
      <Modal.Body>
        <i className="far fa-trash-alt fa-5x m-3 text-danger"></i>
        <p>{label}</p>
        </Modal.Body>
      <Modal.Footer style={{justifyContent: "space-evenly"}}>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmationModal
