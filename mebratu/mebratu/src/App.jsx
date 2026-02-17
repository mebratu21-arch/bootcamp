import React from 'react'
import './App.css'
import Home from './component/home'
import About from './component/about'
import Contact from './component/contact'
import Service from './component/service'
import Try from './component/try'
import Count from './component/count'
import List from './component/list'
import Form from './component/form'



function App() {

  return (
    <>
      <Form />
      <List/>
      <Home />
      <About />
      <Service  />
      <Contact/>
      <Try/>
      <Count/>
    </>
  )
}

export default App
