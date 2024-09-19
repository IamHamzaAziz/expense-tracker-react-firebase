import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/BaseLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AllTransactions from './pages/AllTransactions'
import AddTransaction from './pages/AddTransaction'
import { UserContextProvider } from './context/UserContext'
import LoginReq from './protected_routes/LoginReq'
import LogoutReq from './protected_routes/LogoutReq'

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<LoginReq><Home /></LoginReq>} />
            <Route path='/login' element={<LogoutReq><Login /></LogoutReq>} />
            <Route path='/signup' element={<LogoutReq><Signup /></LogoutReq>} />
            <Route path='/all-transactions' element={<LoginReq><AllTransactions /></LoginReq>} />
            <Route path='/add-transactions' element={<LoginReq><AddTransaction /></LoginReq>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>

  )
}

export default App
