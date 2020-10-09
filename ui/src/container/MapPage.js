import React, { useState } from 'react';
import styled, { keyframes } from "styled-components";
import WorldMap from '../component/WorldlMap';
import Footer from '../component/Footer';
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { client } from '../index';
import { gql } from '@apollo/client';
import { FaRegTrashAlt } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import UpdateModal from '../component/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Map from 'collections/map';


const Page = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  color: black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;

`;

const slideInRight = keyframes`
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const slideOutRight = keyframes`
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
`;

const MapPageElm = styled(Page)`
  &.page-enter {
    animation: ${slideInRight} 0.2s forwards;
  }
  &.page-exit {
    animation: ${slideOutRight} 0.2s forwards;
  }

  .map-selected {
    fill: #E3DA37;
  }
  
  .map-unselected {
    fill: #699EAA;
  }
  
  .map-selected:hover, .map-unselected:hover {
    cursor: pointer;
  }

  .map-unselected:hover{
    fill: blanchedalmond;
  }

  .mapPage-map {
    justify-content: center;
    text-align: center;
  }
  
  .mapPage-header {
    padding: 2rem 0;
    color: antiquewhite;
    font-weight: 500;
    FONT-SIZE: 1.5rem;
  }

  .mapPage-center {
    justify-content: center;
    text-align: center;
    padding: 2rem 0;
    color: darkcyan;
    font-weight: 500;
    FONT-SIZE: 1.5rem;
  }

  .mapPage-footer {
    position: fixed;
    color: lightslategray;
    bottom: 0;
    font-size: 0.8rem;
    width: 100%;
    text-align: center;
  }

  .card-header {
    cursor: pointer;
  }

  .card-align {
    float: right;
    font-size: 0.8rem;
  }

  .card-body {
    overflow: scroll;
    max-height: 500px;
    cursor: pointer;
  }

  .list-group-item:hover {
    background-color: lightyellow;
   }

`;

function MapPage() {
  const worldMap = {
    'NA': 'North America',
    'SA': 'South America',
    'AS': 'Asia',
    'OU': 'Oceania',
    'AQ': 'Antarctica',
    'AF': 'Africa',
    'EU': 'Europe'
  }

  const [state, setState] = useState({
    selectedContinentCode: null,
    selectedRegion: null,
    selectedCountry: null,
    selectedCity: null,
    regionsList: [],
    countriesMap: new Map(),
    citiesMap: new Map(),
    item: '',
    show: false
  })

  /* Get regions on map click */
  const handleMapClick = continentCode => {

    const GET_REGIONS = gql`
          query {
            countries(countryContinent:"${worldMap[continentCode]}"){
            countryRegion,
            countryCode
          }
        }`;
    client.query({ query: GET_REGIONS }).then(result => {
      const uniqueRegionList = [...new Set(result.data.countries.map(item => item.countryRegion))];
      setState({
        ...state,
        selectedContinentCode: continentCode,
        regionsList: uniqueRegionList,
      })
    });
  }

  const toggleClose = item => setState({
    ...state,
    show: false
  })

  const toggleShow = item => {
    setState({
      ...state,
      item: item,
      show: true
    })
  }

  function handleRegionClick(e) {
    let countryMap = new Map(),
      selectedRegion = e.target.textContent
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
        if (!countryMap.has(item.countryCode))
          return countryMap.set(item.countryCode, item.countryName)
      });
      setState({
        ...state,
        selectedRegion: selectedRegion,
        selectedCountry: '',
        countriesMap: countryMap,
        citiesMap: new Map(),
        selectedCity: ''
      })
    });
  }

  function handleCountryClick(e) {
    let countryCode = e.target.id,
      selectedCountry = e.target.textContent,
      cityMap = new Map()
    const GET_CITIES = gql`
            query{
                allcities(cityCountrycode:"${countryCode}"){
                    cityId,
                    cityName,
                    cityCountrycode,
                    cityDistrict,
                    cityPopulation
                }
          }`;

    client.query({ query: GET_CITIES }).then(result => {
      result.data.allcities.forEach(item => {
        if (!cityMap.has(item.cityId))
          cityMap.set(item.cityId, [item.cityId, item.cityName, item.cityCountrycode, item.cityDistrict, item.cityPopulation])
      });
      setState({
        ...state,
        selectedCountry: selectedCountry,
        citiesMap: cityMap,
      })
    });

    // To get country data
    // const GET_COUNTRYDATA = gql`
    //       query{
    //         countrylanguage(countrylanguageCountrycode:"${countryCode}"){
    //           countrylanguageIsofficial,
    //           countrylanguageLanguage,
    //           countrylanguagePercentage
    //         }
    //       }`;

    // client.query({
    //   query: GET_COUNTRYDATA
    // }).then(result => {
    //   result.data.countrylanguage.forEach(item => {
    //     //console.log("item", item)
    //   });
    // });
  }

  return (
    <MapPageElm>
      <Row >
        <Col className="mapPage-center" md={12}>Click the map to populate the information under the accordions</Col>
      </Row>
      <Row>
        <Col md={5}>
          <WorldMap className='mapPage-map' selectedContinent={state.selectedContinentCode} onClickMap={handleMapClick} />
        </Col>
        <Col md={5}>
          <Row>
            <UpdateModal show={state.show} item={state.item} handleClose={toggleClose}></UpdateModal>
            <Accordion style={{ width: "100%" }}>
              {/* Panel to show regions */}
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Regions in Continent <b>{worldMap[state.selectedContinentCode]}</b> <span className="card-align">(Count:{state.regionsList.length})</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <ListGroup>
                      {
                        state.regionsList.map(((item, val) =>
                          <ListGroup.Item id={val} onClick={handleRegionClick}>
                            {item}
                          </ListGroup.Item>
                        ))
                      }
                    </ListGroup>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              {/* Panel to show countries */}
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Countries filtered by selected region <b>{state.selectedRegion}</b> <span className="card-align">(Count:{state.countriesMap.size})</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    {
                      state.countriesMap.map(((item, val) =>
                        <ListGroup.Item id={val} onClick={handleCountryClick}>
                          {item}
                        </ListGroup.Item>
                      ))
                    }
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              {/* Panel to show cities */}
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  Cities filtered by selected country <b>{state.selectedCountry}</b> <span className="card-align">(Count:{state.citiesMap.size})</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    Add country language info
                    {state.citiesMap.map(((item, val) => <ListGroup.Item id={val} onClick={() => toggleShow(item)} >
                    {item[1]}   <span className="card-align">
                      <AiFillEdit onClick={toggleShow} />  |  <FaRegTrashAlt onClick={toggleShow} />
                    </span>
                  </ListGroup.Item>
                  ))
                    }
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

          </Row>
        </Col>
      </Row>
      <Row>
        <Footer className='mapPage-footer' text={"The gladdest moment in human life, methinks, is a departure into unknown lands. – Sir Richard Burton"} />
      </Row>
    </MapPageElm>
  );
}
export default MapPage;