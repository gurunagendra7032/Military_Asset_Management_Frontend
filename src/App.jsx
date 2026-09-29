import { useState } from 'react'
import './App.css'
import Base from './pages/Base'
import Purchase from './pages/Purchase'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transfer from './pages/Transfer';
import AssetAssignment from './pages/AssetAssignment';
import Expenditure from './pages/Expenditure';
import DashBoard from './pages/DashBoard';
import SignUp from './pages/SignUp';
import BaseCommande from './pages/BaseCommande';
import Login from './pages/LoginPage';
import Logistic_Officer from './pages/Officer';





function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/base/signup" element={<BaseCommande/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="logistic_officer" element={<Logistic_Officer/>}/>
        <Route path="/bases" element={<Base />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/transfer" element={<Transfer/>}/>
        <Route path="/itemAssign" element={<AssetAssignment/>}/>
        <Route path="/expenditure" element={<Expenditure/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
