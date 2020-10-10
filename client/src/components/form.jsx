import React, { useState } from 'react';
import { Form, Card , Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CreateLoanDetails } from '../store/loan/action';

const FormInput = () => {
  const dispatch = useDispatch();
  const store = useSelector( store => store.loanRoot );
  const { customerid } = useParams();
  const [amount, setAmount] = useState();
  const [rate, setRate] = useState();
  const [duration, setDuration] = useState();

  const handleCreateLoan = (e) => {
    e.preventDefault();
    let loanDetails = {
      principleValue: amount,
      interestRate: rate,
      duration: duration
    };
    dispatch(CreateLoanDetails(loanDetails, customerid))
  }

  return(
    <div>
      <Card style={{ width: '82rem', margin: "20px", padding: "20px"}}>
        <Form onSubmit={handleCreateLoan} >
          <div style={{display: "flex"}}>
            <div className="ml-2" style={{width: "400px"}}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" placeholder="Enter Amount" onChange={ (e) => setAmount(e.target.value) }/>
              </Form.Group>
            </div>
            <div className="ml-5" style={{width: "400px"}}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Intereset Rate</Form.Label>
                <Form.Control type="number" placeholder="Rate" onChange={ (e) => setRate(e.target.value) }/>
              </Form.Group>
            </div>
            <div className="ml-5" style={{width: "400px"}}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Duration in year </Form.Label>
                <Form.Control type="number" placeholder="Duration in year" onChange={ (e) => setDuration(e.target.value) }/>
              </Form.Group>
            </div>
          </div>
          <Button variant="primary" type="submit">
            Request Loan
          </Button>
        </Form>
      </Card>
    </div>
  )
};

export default FormInput