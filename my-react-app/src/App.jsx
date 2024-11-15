import { useState } from 'react'
// import './App.css'
// import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import NavBar from './components/NavBar'
import Graph from './components/Graph'

function App() {
  const sampleData = [
    { t: 1675846800000, c: 153.68 },
    { t: 1675850400000, c: 153.76 },
    { t: 1675854000000, c: 153.76 },
    { t: 1675857600000, c: 153.83 },
    { t: 1675861200000, c: 153.94 },
  ];

  return (
    <div className='App'>
      <NavBar />
      <Graph data={sampleData}/>
    </div>
  )
}

export default App
