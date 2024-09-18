import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/BaseLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AllTransactions from './pages/AllTransactions'
import AddTransaction from './pages/AddTransaction'
import { UserContextProvider } from './context/UserContext'

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/all-transactions' element={<AllTransactions />} />
            <Route path='/add-transactions' element={<AddTransaction />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>

  )
}

export default App
