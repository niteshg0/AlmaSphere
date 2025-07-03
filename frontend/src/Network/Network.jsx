import React, { useEffect, useState } from 'react'
import { useGetConnectionRequestsQuery } from '../redux/Api/connectUserApiSlice'
import ConnectionProfile from '../components/ConnectionComponents/ConnectionProfile'
import { Link } from 'react-router'

const Network = () => {
  const [connections , setConnections] = useState([])
  const { data: connectionData, refetch } = useGetConnectionRequestsQuery()

  const handleGetRequest = async () => {
    setConnections(connectionData)
    console.log(connectionData)
  }
  
  useEffect (() => {
    if(connectionData) handleGetRequest()
    refetch()
  },[connectionData])

  if(!connectionData){
    return (
      <div>Loading ...</div>
    )
  }

  return (
    <div>
      {connections ? connections.map((c) => (
        <div key={c._id}>
          <Link to={`/profiles/${c.senderUserId.rollNumber}`}><ConnectionProfile user={c.senderUserId} connectionId={c._id}/></Link>
        </div>
      )): "No request found"}
    </div>
  )
}

export default Network