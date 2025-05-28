import React, { useEffect, useState } from 'react'
import { useGetUserConnectionsQuery } from '../redux/Api/connectUserApiSlice'
import { Link } from 'react-router'
import ConnectedUserProfile from '../components/ConnectionComponents/ConnectedUserProfile'

const ConnectedUsers = () => {
    const [allConnection , setAllConnection] = useState([])
    const {data , isLoading, refetch} =  useGetUserConnectionsQuery()
    
    useEffect(()=>{
        setAllConnection(data)
        refetch();
    },[data])

    console.log(allConnection)

  return (
    <div>
      
      {allConnection ? allConnection.map((c) => (
        <div key={c._id}>
          <Link to={`/profiles/${c.rollNumber}`}><ConnectedUserProfile user={c}/></Link>
        </div>
      )): ""}
    </div>
  )
}

export default ConnectedUsers