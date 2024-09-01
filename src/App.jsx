
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
