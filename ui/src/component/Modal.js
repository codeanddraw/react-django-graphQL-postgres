import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { gql,useMutation  } from '@apollo/client';



const UpdateModal=({show,handleClose,item}) =>{
    const [state, setState] = useState({
        id: item[0],
        name: item[1],
        code: item[2],
        district: item[3],
        population: item[4]
      });
    
    const SET_MUATATION = gql `
    mutation{
        addCity(cityId:${state.id},cityName:${state.name},cityCountrycode:${state.code},cityDistrict:${state.district},cityPopulation:${state.population}) {
            addCity{
             cityId,
             cityName,
             cityCountrycode,
             cityDistrict,
             cityPopulation
             }
           }
        }`;
    const [addCity] = useMutation(SET_MUATATION);

    const handleSave=(id)=>{
        console.log("save",id)
        addCity();      
     }

     const handleDelete=()=>{  
        const DELETE_MUATATION = gql`
        mutation{
            addCity(cityId:"${state.id}",cityName:"${state.name}",cityCountrycode:"${state.code}",cityDistrict:"${state.district}",cityPopulation:${state.population}) {
               addCity{
                cityId,
                 cityName,
                 cityCountrycode,
                 cityDistrict,
                 cityPopulation
                 }
               }
            }`;
     }

    return (
      <>
      
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Admin Panel</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you can now edit the records!</Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
            placeholder={item[0]}
            aria-label="Id"
            //value={item[0]}
            onChange={e =>{
                let inputValue = e.target.value;
                 (setState({
                    ...state,
                    id: inputValue
                }
            ))}}
            />
             <FormControl
            placeholder={item[1]}
            aria-label="name"
            //value={item[1]}
            onChange={e => 
               { let inputValue = e.target.value;
                setState({
                    ...state,
                    name: inputValue
             })}}
            />
             <FormControl
            placeholder={item[2]}
            aria-label="code"
            //value={item[2]}
            onChange={e => 
                { let inputValue = e.target.value;
                setState({
                    ...state,
                    code:inputValue 
             })}}
            />
            <FormControl
            placeholder={item[3]}
            aria-label="district"
            //value={item[3]}
            onChange={e => {
                let inputValue = e.target.value;
                setState({
                    ...state,
                    district:  inputValue
             })}}
            />
            <FormControl
            placeholder={item[4]}
            aria-label="population"
            //value={item[4]}
            onChange={e => 
                { let inputValue = e.target.value;
                setState({
                    ...state,
                    population: inputValue
             })}}
            />
          </InputGroup>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="primary" onClick={() => {
                handleSave(item[0])
                handleClose()
            }
        }>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default UpdateModal;
