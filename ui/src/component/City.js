import React, { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import ListGroup from 'react-bootstrap/ListGroup'
import { useQuery, NetworkStatus } from "@apollo/client"
import { useMutation } from '@apollo/client'
import { GET_CITIES, DELETE_CITY } from '../container/Query'
import UpdateModal from './Modal'
import Loading from './Loading'

function City({ countryCode }) {
  const [ show, setShow ] = useState(false)
  const [ row, setRow ] = useState("")

  const [ deleteCity,{ loading: delMutationLoading, error: delMutationError } ] = useMutation(DELETE_CITY)

  const { loading, error, data, refetch, networkStatus } = useQuery(GET_CITIES, {
      variables: {countryCode},
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true
    },
  );

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!' && <Loading/>;
  if (loading) return null;
  if (error) return `Error! ${error}`;


  const toggleOpen = (item) => {
    setShow(true)
    setRow(item)
  }

  const closeModal = () => {
    refetch()
    setShow(false)
  }

  const handleDelete = (item) => {
      deleteCity({
        variables: { 
            "cityId": `${item.cityId}`,
            refetchQueries: [{query: GET_CITIES}]
          }
      });
      console.log("Deleted")
      refetch()

  }

  const getClassname = (item, currentSelection) => {
    if (item === currentSelection) return 'selected';
    return 'unselected';
  } 

  return (<>
    <UpdateModal show={show} row={row} handleCloseModal={() => setShow(false)} handleClose={closeModal}></UpdateModal>
    {delMutationLoading && <p>Loading after delete...</p>}
    {delMutationError && <p>Error :( Please try again</p>}
    { 
      data && data.getAllCities && data.getAllCities.map((item, key) =>
        <ListGroup.Item key={key} className={getClassname(item.cityName, row.cityName)}>
          {item.cityName}
          <span className="card-align">
            <AiFillEdit onClick={() => toggleOpen(item)} />  |  <FaRegTrashAlt onClick={() => {handleDelete(item)}} />
          </span>
  
        </ListGroup.Item>)
    }
  </>
  )
}

export default City;
