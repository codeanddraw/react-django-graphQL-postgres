import React, { useState } from 'react';
import styled, { keyframes } from "styled-components";
import Map from '../component/GeographicalMap';
import Accordion from '../component/AccordionGroup';
import Footer from '../component/Footer';


import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql } from '@apollo/client';
import { client } from '../index';


const map = {
  'NA': 'North America',
  'SA': 'South America',
  'AS': 'Asia',
  'OU': 'Oceania',
  'AQ': 'Antarctica',
  'AF': 'Africa',
  'EU': 'Europe'
}

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
`;

function MapPage() {
  const [selected, onSelect] = useState('');
  const [regions, setRegions] = useState([]);

  const handleSelect = continentCode => {

    continentCode = continentCode.toUpperCase()

    const GET_REGIONS = gql`
        query {
          countries(countryContinent:"${map[continentCode]}"){
          countryRegion,
          countryCode
        }
      }`;

    client.query({
      query: GET_REGIONS
    }).then(result => {
      const unique = [...new Set(result.data.countries.map(item => item.countryRegion))];
      setRegions(unique)
      onSelect(continentCode)
      console.log(unique)
    });
  }

  let continentName = map[selected.toUpperCase()]

  return (
    <MapPageElm>
      <Row >  <Col className="mapPage-center" md={12}>Click the map to populate the information under the accordions</Col>
      </Row>
      <Row>
        <Col md={5}>
          <Map className='mapPage-map' selected={selected} onSelect={handleSelect} />
        </Col>
        <Col md={5}>
          <Row>
            <Accordion continentName={continentName} regions={regions} />
          </Row>
        </Col>
        <Footer className='mapPage-footer' text={"The gladdest moment in human life, methinks, is a departure into unknown lands. – Sir Richard Burton"} />
      </Row>
    </MapPageElm>
  );
}
export default MapPage;