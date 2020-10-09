import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import { gql,useMutation  } from '@apollo/client';
import { client } from '../index';


const UpdateModal=({show, handleClose, item}) =>{
    const [state, setState] = useState({
        id: item[0],
        name: item[1],
        code: item[2],
        district: item[3],
        population: item[4]
      });
    const [validated, setValidated] = useState(false);

    
    const SET_MUTATION = gql `
    mutation{
        addCity(cityId:${state.id},cityName:"${state.name}",cityCountrycode:"${state.code}",cityDistrict:"${state.district}",cityPopulation:${state.population}) {
            city{
             cityId,
             cityName,
             cityCountrycode,
             cityDistrict,
             cityPopulation
             }
           }
        }`;
      const DELETE_MUTATION = gql`
      mutation{
        deleteCity(cityId:${item[0]}) {
            city{
            cityId
          }
      }
      }`;
    const [ addCity ] = useMutation(SET_MUTATION);
    const [ deleteCity, { loading, error } ] = useMutation(DELETE_MUTATION);

    if (loading) return <p>Loading</p>;;
    if (error) return <p>An error occurred</p>;

    const handleSubmit = (event) => {
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        setValidated(true);
        addCity();
        handleClose();
      }  
    };
  

     const handleDelete = (event) => {  
        deleteCity()
        handleClose()
     }

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Admin Panel</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you can now edit the city records!</Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} md="4" >
              <Form.Label>Id</Form.Label>
                <FormControl
                placeholder={item[0]}
                required
                aria-label="Id"
                aria-describedby="Id"
                //defaultValue={item[0]}
                onChange={e =>{
                    let inputValue = e.target.value;
                    (setState({
                        ...state,
                        id: inputValue
                    }
                ))}}
                />
            </Form.Group>

            <Form.Group as={Col} md="4" >
              <Form.Label>Name</Form.Label>
              <FormControl
               required
              placeholder={item[1]}
              aria-label="name"
              aria-describedby="name"
             // defaultValue={item[1]}
              onChange={e => 
                { let inputValue = e.target.value;
                  setState({
                      ...state,
                      name: inputValue
              })}}
              />
              </Form.Group>

            <Form.Group as={Col} md="4" >
            <Form.Label>Code</Form.Label>
             <FormControl
             required
            placeholder={item[2]}
            aria-label="code"
            aria-describedby="code"
            //value={item[2]}
            onChange={e => 
                { let inputValue = e.target.value;
                setState({
                    ...state,
                    code:inputValue 
             })}}
            />
            </Form.Group>

            <Form.Group as={Col} md="4" >
            <Form.Label>District</Form.Label>
            <FormControl
            required
            placeholder={item[3]}
            aria-label="district"
            aria-describedby="district"
            //value={item[3]}
            onChange={e => {
                let inputValue = e.target.value;
                setState({
                    ...state,
                    district:  inputValue
             })}}
            />
             </Form.Group>

             <Form.Group as={Col} md="4" >
            <Form.Label>Population</Form.Label>
            <FormControl
            required
            placeholder={item[4]}
            aria-label="population"
            aria-describedby="population"
            //value={item[4]}
            onChange={e => 
                { let inputValue = e.target.value;
                setState({
                    ...state,
                    population: inputValue
             })}} 
            />  
            </Form.Group>

          <Modal.Footer>
          <Button type="submit">Update</Button>
          <Button variant="secondary" onClick={handleDelete}> Delete </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
  
  export default UpdateModal;
