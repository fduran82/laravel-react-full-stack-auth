import {Link, Navigate, Outlet} from "react-router-dom";

import {useStateContext} from "../contexts/ContextProvider.jsx";
import { useEffect } from "react"
import axiosClient from "../axios-client.js"

export default function DefaultLayout() {
  const { user, token, notification, setUser, setToken } = useStateContext()

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data)
      })
  }, [])

  if (!token) {
    return <Navigate to="/Login" />
  }

  const onLogout = ev => {
    ev.preventDefault()

    console.log('logout...');

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  return (
      <div id="defaultLayout">
        <aside>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/users">Users</Link>
        </aside>
        <div className="content">
          <header>
            <div>
              Header
            </div>
            <div>
              {user.name}
              <a className="btn-logout" href="#" onClick={onLogout}>
                Logout
              </a>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
          {notification &&
            <div className="notification">
              {notification}
            </div>
          }
        </div>
      </div>
  )
}
