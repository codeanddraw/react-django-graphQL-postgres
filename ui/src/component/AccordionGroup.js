import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { client } from '../index';
import { gql } from '@apollo/client';
import Map from 'collections/map';
import { FaRegTrashAlt } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import ModalGroup from '../component/Modal'


const AccordionGroup = ({ continentName, regions }) => {
    let map = new Map()
    let cityMap = new Map()

    const [selectedRegion, onSelectRegion] = useState('');

    const [countries, setCountries] = useState(map);

    const [selectedCountry, onSelectCountry] = useState('');

    const [cities, setCities] = useState(cityMap);

    const [selectedCity, onSelectCity] = useState('');

    const [show, setShow] = useState(false);
    const [item, setItem] = useState([]);

    const toggleClose = (item) => {
        setShow(false)
    }
    const toggleShow = (item) => {
        setItem(item)
        setShow(true)
    }

    function onClick(e) {
        onSelectRegion(e.target.textContent)
        const GET_COUNTRIES = gql`
        query {
            regions(countryRegion:"${e.target.textContent}"){
              countryName, 
              countryCode
            }
          }`;

        client.query({
            query: GET_COUNTRIES
        }).then(result => {
            result.data.regions.forEach(item => {
                if (!map.has(item.countryCode))
                    return map.set(item.countryCode, item.countryName)
            });
        setCountries(map)
        setCities(new Map())
        onSelectCountry('')
        });
    }

    function onClickCountry(e) {
        let countryCode = e.target.id
        onSelectCountry(e.target.textContent)

        const GET_CITIES = gql`
            query{
                allcities(cityCountrycode:"${e.target.id}"){
                    cityId,
                    cityName,
                    cityCountrycode,
                    cityDistrict,
                    cityPopulation
                }
          }`;

        client.query({
            query: GET_CITIES
        }).then(result => {
            result.data.allcities.forEach(item => {
                if (!cityMap.has(item.cityId))
                    cityMap.set(item.cityId, [item.cityId, item.cityName, item.cityCountrycode, item.cityDistrict, item.cityPopulation])
            });


            console.log(cityMap)
            setCities(cityMap)
        });

        const GET_COUNTRYDATA = gql`
          query{
            countrylanguage(countrylanguageCountrycode:"${countryCode}"){
              countrylanguageIsofficial,
              countrylanguageLanguage,
              countrylanguagePercentage
            }
          }`;

        client.query({
            query: GET_COUNTRYDATA
        }).then(result => {
            result.data.countrylanguage.forEach(item => {
                //console.log("item", item)
            });
        });
    }

    return <><ModalGroup show={show} item={item} handleClose={toggleClose}></ModalGroup>
        <Accordion style={{ width: "100%" }}>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Regions in Continent <b>{continentName}</b> <span className="card-align">(Count:{regions.length})</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <ListGroup>
                            {regions.map((
                                item => <ListGroup.Item onClick={onClick}>
                                    {item}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>

            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Countries filtered by selected region <b>{selectedRegion}</b> <span className="card-align">(Count:{countries.size})</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        {countries.map(((item, val) => <ListGroup.Item id={val} onClick={onClickCountry}>
                            {item}
                        </ListGroup.Item>
                        )) }
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                    Cities filtered by selected country <b>{selectedCountry}</b> <span className="card-align">(Count:{cities.size})</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        {/* Add country language info */}
                        {cities.map(((item, val) => <ListGroup.Item id={val} onClick={() => toggleShow(item)} >
                            {item[1]}   <span className="card-align">
                                {/* <AiFillEdit cityName={item} onClick={toggleShow}/>  |  <FaRegTrashAlt onClick={toggleShow}/> */}
                            </span>
                        </ListGroup.Item>
                        ))
                        }
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion></>
};

export default AccordionGroup;