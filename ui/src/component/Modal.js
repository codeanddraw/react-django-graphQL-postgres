import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import { useMutation } from '@apollo/client'
import { ADD_CITY, GET_CITIES } from '../container/Query'

const UpdateModal = ({ show, row, handleClose, handleCloseModal }) => {
  const [ validated, setValidated ] = useState(false);
  const [ addCity ] = useMutation(ADD_CITY);
  const [ state, setState]  = useState({
    id: null,
    name: null,
    code: null,
    district: null,
    population: null
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      setValidated(true);
      addCity({
        variables: { 
            "cityId": `${state.id}`,
            "cityName": `${state.name}`,
            "cityCountrycode": `${state.code}`,
            "cityDistrict": `${state.district}`,
            "cityPopulation": `${state.population}`,
            refetchQueries: [{query: GET_CITIES}]
          }
      });
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Panel</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you can now edit the city records!</Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Col} md="4" >
            <Form.Label>Id</Form.Label>
            <FormControl
              placeholder={row && row.cityId && "id"}
              required
              aria-label="Id"
              aria-describedby="Id"
              onChange={e => {
                let inputValue = e.target.value;
                (setState({
                  ...state,
                  id: inputValue
                }
                ))
              }}/>
          </Form.Group>

          <Form.Group as={Col} md="4" >
            <Form.Label>Name</Form.Label>
            <FormControl
              required
              placeholder={row && row.cityName}
              aria-label="name"
              aria-describedby="name"
              onChange={e => {
                let inputValue = e.target.value;
                setState({
                  ...state,
                  name: inputValue
                })
              }}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" >
            <Form.Label>Code</Form.Label>
            <FormControl
              required
              placeholder={row && row.cityCountrycode}
              aria-label="code"
              aria-describedby="code"
              onChange={e => {
                let inputValue = e.target.value;
                setState({
                  ...state,
                  code: inputValue
                })
              }}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" >
            <Form.Label>District</Form.Label>
            <FormControl
              required
              placeholder={row && row.cityDistrict}
              aria-label="district"
              aria-describedby="district"
              onChange={e => {
                let inputValue = e.target.value;
                setState({
                  ...state,
                  district: inputValue
                })
              }}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" >
            <Form.Label>Population</Form.Label>
            <FormControl
              required
              placeholder={row && row.cityPopulation}
              aria-label="population"
              aria-describedby="population"
              onChange={e => {
                let inputValue = e.target.value;
                setState({
                  ...state,
                  population: inputValue
                })
              }}
            />
          </Form.Group>

          <Modal.Footer>
            <Button type="submit">Update City</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateModal;
