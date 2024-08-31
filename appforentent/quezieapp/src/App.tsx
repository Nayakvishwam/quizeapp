import { useState } from 'react'
import Navabar from './components/navbar'
import AppRouter from './Approute'

function App():JSX.Element {
  return (
    <>
      <Navabar />
      <AppRouter />
    </>
  )
}

export default App
