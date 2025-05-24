import { useState } from 'react'
import { routes } from './router/router'
import { useRoutes } from "react-router-dom";

function App() {
  const element = useRoutes(routes)
  localStorage.setItem('languageId', '2');

  return (
    <>
      {element}
    </>
  )
}

export default App
