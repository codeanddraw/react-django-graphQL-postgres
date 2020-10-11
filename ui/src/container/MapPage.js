import React, { useState } from 'react';
import styled, { keyframes } from "styled-components";
import WorldMap from '../component/WorldlMap';
import Footer from '../component/Footer';
import AccordionGroup from '../component/AccordionGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Page = styled.div`
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

  .accordion {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  .card-align {
    float: right;
    font-size: 0.8rem;
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

  .map-img {
    width: 100%
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
    color: lightslategray;
    position: fixed;
    bottom: 0;
    font-size: 0.8rem;
    width: 100%;
    text-align: center;
  }

  @media only screen and (max-width: 640px)
  {
    .mapPage-footer  {
        display: none !important;
    }
  }
  .card-header {
    cursor: pointer;
  }

  .card-body {
    overflow: scroll;
    max-height: 500px;
    cursor: pointer;
  }

  .selected {
    background-color: #E3DA37;
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
  const [selectedContinentCode, setSelectedContinentCode] = useState(null)

  /* ************************************************************ */
  /* Get countries on map click 
  /* ************************************************************ */
  const handleMapClick = continentCode => {
    console.log("**************handleMapClick continentCode", continentCode)
    setSelectedContinentCode(continentCode)
  }

  return (
    <MapPageElm>
      <Row className="justify-content-md-center">
        <Col className="mapPage-center" md={12}  sm={12}>Click the map to populate the information under the accordions</Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <WorldMap className='mapPage-map' selectedContinent={selectedContinentCode} onClickMap={handleMapClick} />
        </Col>
        <Col md={6}  sm={12}>
          <Row>
            <AccordionGroup selectedContinent={worldMap[selectedContinentCode]} />
          </Row>
        </Col>
      </Row>
      <Row>
      <Col log={8} md={8}  sm={8}>
        <Footer className='mapPage-footer' text={"The gladdest moment in human life, methinks, is a departure into unknown lands. – Sir Richard Burton"} />
      </Col>
      </Row>
    </MapPageElm>
  );
}

export default MapPage;
