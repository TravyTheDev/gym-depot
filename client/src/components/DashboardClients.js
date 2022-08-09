import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from '../axios'
import Loading from './Loading'

const DashboardClients = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get('/users')
        .then(({data}) => {
            setLoading(false)
            setUsers(data)
        }).catch((error) => {
            setLoading(false)
            console.log(error)
        })
    }, [])

    if(loading){
        return <Loading />
    }

    if(users.length === 0) {
        return <h2 className='py-2 text-center'>No users yet</h2>
    }

  return (
    <Table striped bordered hover responsive>
        <thead>
            <tr>
                <th>Client ID</th>
                <th>Client Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user)=>(
                <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                </tr>
            ))}
        </tbody>
    </Table>
  )
}

export default DashboardClients