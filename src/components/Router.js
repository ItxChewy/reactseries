import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import MenuSeries from './MenuSeries'
import SeriePorId from './SeriePorId';
import VerPersonaje from './VerPersonaje';
import CreatePersonajes from './CreatePersonajes';
import Home from './Home';
import UpdatePersonajes from './UpdatePersonajes';

export default class Router extends Component {
  render() {
    function SeriePorIdElement (){
        var {id} = useParams();
        return (<SeriePorId id={id}/>)
    }
    function VerPersonajeElement(){
        var {id} = useParams();
        return(<VerPersonaje id={id}/>)
    }
    return (
      <BrowserRouter>
      <MenuSeries/>
        <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/serie/:id' element={<SeriePorIdElement/>}/>
            <Route path='/personajes/:id' element={<VerPersonajeElement/>}/>
            <Route path='/create' element={<CreatePersonajes/>}/>
            <Route path='/update' element={<UpdatePersonajes/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
