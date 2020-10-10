import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { RequestMessagetoagent } from '../store/loan/action';

const Modals = ({show, handleClose, handleShow, agentid}) => {
  const dispatch = useDispatch();
  const [labelname, setLabelname] = useState();
  const [amount, setAmount] = useState();
  const [duration, setDuration] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    let loanRequest = {
      loanname: labelname,
      loanvalue: amount,
      duration: duration
    }
    // console.log(loanRequest, agentid)
    dispatch(RequestMessagetoagent(agentid, loanRequest))
    handleClose()
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Loan Name</Form.Label>
              <Form.Control type="text" placeholder="Enter email" onChange={ (e) => setLabelname(e.target.value) } />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Amount" onChange={ (e) => setAmount(e.target.value) } />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Duration</Form.Label>
              <Form.Control type="number" placeholder="Duration" onChange={ (e) => setDuration(e.target.value) }/>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Modals;