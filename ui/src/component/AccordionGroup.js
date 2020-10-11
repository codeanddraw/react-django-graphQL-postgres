import React, { useState, useEffect } from 'react'
import Map from 'collections/map'
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { GET_REGIONS } from '../container/Query'
import { useQuery } from '@apollo/react-hooks'
import City from './City'
import Loading from '../component/Loading'

const AccordionGroup = ({ selectedContinent }) => {
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedCountryCode, setSelectedCountryCode] = useState(null)
    const [countryData, setCountryData] = useState([])

    useEffect(() => {
        setSelectedCountry(null)
        setSelectedCountryCode(null)
        setCountryData([])
        setSelectedRegion(null)
        console.log('value changed selectedContinent!')

    }, [selectedContinent]);

    const { loading, error, data } = useQuery(GET_REGIONS, {
        variables: {
            "countryContinent": `${selectedContinent}`
        }
    });

    if (loading) return <Loading/>
    if (error) return <p> An error occured </p>


    /* ************************************************************ */
    /* Get countries on selected region 
    /* ************************************************************ */
    const handleRegionClick = (selectedRegion) => {
        let countryData = data.getAllRegions.filter(item => {
            return item.countryRegion === selectedRegion;
        });
        setSelectedRegion(selectedRegion)
        setCountryData(countryData)
        setSelectedCountryCode(null)
        setSelectedCountry(null)
    }

    /* ************************************************************ */
    /* Get cities on selected country based on the country code
    /* ************************************************************ */
    const handleCountryClick = (item) => {
        let countryCode = item.countryCode,
            countryName = item.countryName

        setSelectedCountry(countryName)
        setSelectedCountryCode(countryCode)
    }

    const getRegionList = (data) => {
        const result = [];
        const map = new Map();

        for (const item of data) {
            if (!map.has(item.countryRegion)) {
                map.set(item.countryRegion, true);    // set any value to Map
                result.push({ countryRegion: item.countryRegion });
            }
        }
        return result
    }

    const getClassname = (item, currentSelection) => {
        if (item === currentSelection) return 'selected';
        return 'unselected';
    }

    let regions = getRegionList(data.getAllRegions)
    return (
        <Accordion style={{ width: "100%" }}>

            {/* Panel to show regions */}
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Regions in Continent <b>{selectedContinent}</b> <span className="card-align">(Count:{regions.length})</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <ListGroup>
                            {regions.map((item, key) => {
                                return <ListGroup.Item key={key} className={getClassname(item.countryRegion, selectedRegion)} onClick={() => handleRegionClick(item.countryRegion)}>
                                    {item.countryRegion}
                                </ListGroup.Item>
                            })
                            }
                        </ListGroup>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>

            {/* Panel to show countries */}
            {/* <Button type="primary">Get more info</Button> */}
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Countries filtered by selected region  <b>{selectedRegion}</b> <span className="card-align">(Count:{countryData.length})</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <ListGroup>
                            {countryData.map((item, key) => {
                                return <ListGroup.Item className={getClassname(item.countryName, selectedCountry)} key={key} onClick={() => handleCountryClick(item)}>
                                    {item.countryName}
                                </ListGroup.Item>
                            })
                            }
                        </ListGroup>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>

            {/* Panel to show cities */}
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                        Cities filtered by selected country <b>{selectedCountry}</b>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        {
                            selectedCountryCode && <City countryCode={selectedCountryCode} />
                        }
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default AccordionGroup;
