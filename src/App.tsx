import Navbar from './components/Navbar'
import './assets/css/App.css'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {


  return (
    <BrowserRouter>
      <Navbar showAvatar={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
  