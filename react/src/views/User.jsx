import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { Link } from "react-router-dom"
import { useStateContext } from '../contexts/ContextProvider'// Import Link from react-router-dom

export default function User() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers();
  }, [])

  const onDelete = (user) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification("User was successfully deleted!")
        getUsers()
      })
     .catch(() => {
        console.log('Error deleting user')
      })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        console.log(data)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }


  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add" >Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <Link to={`/users/${user.id}`} className="btn-edit">Edit</Link>
                    <button className="btn-delete" onClick={() => onDelete(user)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
