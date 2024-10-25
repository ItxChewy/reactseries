import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

export default class UpdatePersonajes extends Component {

    selectPersonajes = React.createRef();
    selectSeries = React.createRef();

    state = {
        series:[],
        personajes:[],
        personajeActual:[],
        serieActual:[],
        status:false
    }

    loadSeries = () =>{
        let request = "api/series"
        axios.get(Global.urlApi + request).then(response =>{
            this.setState({
                series:response.data,
                serieActual:response.data[0]
            })
        })
    }

    cambiarSerie = (e) =>{
        e.preventDefault();
        let request = "api/series/" + this.selectSeries.current.value
        axios.get(Global.urlApi + request).then(response =>{
            this.setState({
                serieActual:response.data
            })
        })
    }

    cambiarPersonaje = (e) =>{
        e.preventDefault();
        let request = "api/personajes/" + this.selectPersonajes.current.value
        axios.get(Global.urlApi + request).then(response =>{
            this.setState({
                personajeActual:response.data
            })
        })
    }

    updatePersonaje = (e) =>{
        e.preventDefault()
        let request = "api/personajes/" + this.selectPersonajes.current.value + "/" + this.selectSeries.current.value
        axios.put(Global.urlApi + request).then(response =>{
            this.setState({
                status:true
            })
        })
    }

    loadPersonajes = ()=>{
        let request = "api/personajes"
        axios.get(Global.urlApi + request).then(response =>{
            this.setState({
                personajes:response.data,
                personajeActual:response.data[0]
            })
        })
    }

    componentDidMount =()=>{
        this.loadSeries()
        this.loadPersonajes()
    }

  render() {
    return (
      <div style={{padding:"5%" ,textAlign:"center"}}>
        {
            this.state.status == true &&
            (<Navigate to={"/"}/>)
        }
        <h1>Personajes y Series</h1>
        <form className='form' onSubmit={this.updatePersonaje}>
            <label className='form-label'>Selecciona una serie:</label>
            <select onChange={this.cambiarSerie} className='form-select' ref={this.selectSeries}>
                {
                    this.state.series.map((serie,index) =>{
                        return(
                            <option key={index} value={serie.idSerie}>
                                {serie.nombre}
                            </option>
                        )
                    })
                }
                </select>
                <label className='form-label'>Selecciona un personaje:</label>
                <select onChange={this.cambiarPersonaje} className='form-select' ref={this.selectPersonajes}>
                {
                    this.state.personajes.map((personaje,index) =>{
                        return(
                            <option key={index} value={personaje.idPersonaje}>
                                {personaje.nombre}
                            </option>
                        )
                    })
                }
            </select><br></br>
            <button className='btn btn-success'>Guardar Cambios</button>
        </form><br></br>
        <div>
                <h1>Serie : {this.state.serieActual.nombre}</h1>
                <img src={this.state.serieActual.imagen} style={{height:"150px", width:"150px"}}></img>
                <hr></hr>
                <h1>Serie : {this.state.personajeActual.nombre}</h1>
                <img src={this.state.personajeActual.imagen} style={{height:"150px", width:"150px"}}></img>
        </div>
      </div>
    )
  }
}
