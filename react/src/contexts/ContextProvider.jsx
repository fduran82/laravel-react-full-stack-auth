import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => { },
  setNotification: () => { },
})

export const ContextProvider = ({children}) => {

  // states
  const [user, setUser] = useState({});
  // const [user, setUser] = useState({
  //   name: 'Fide'
  // });
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  // const [token, _setToken] = useState(123);
  const [notification, _setNotification] = useState('')

  const setNotification = (message) => {
    _setNotification(message)

    setTimeout(() => {
      _setNotification('')
    }, 5000);
  }

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      notification,
      setNotification,
    }}>
      {children}
    </StateContext.Provider>
  )
}


export const useStateContext = () => useContext(StateContext);
