import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Signup from './pages/signup'
import Signin from './pages/Signin'
import Sendmoney from './pages/Sendmoney'
import Dashboard from './pages/Dashboard'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/send" element={<Sendmoney/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
