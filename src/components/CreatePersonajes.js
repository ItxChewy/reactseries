import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'
import { Navigate } from 'react-router-dom';

export default class CreatePersonajes extends Component {
    cajaImagen = React.createRef();
    cajaNombre = React.createRef();
    selectSerie = React.createRef();

    state ={
        series:[],
        status:false
    }
    loadSeries = () =>{
        let request = "api/series"
        axios.get(Global.urlApi + request).then(response =>{
            this.setState({
                series:response.data
            })
        })
    }
    createPersonaje = (e) =>{
        e.preventDefault();
        console.log(this.selectSerie.current.value)
        let personaje = {
            idPersonaje: 1,
            nombre: this.cajaNombre.current.value,
            imagen: this.cajaImagen.current.value,
            idSerie: parseInt(this.selectSerie.current.value)
        }
        let request = "api/Personajes"
        axios.post(Global.urlApi + request,personaje).then(response =>{
            this.setState({
                status:true
            })
        })
    }

    componentDidMount = () =>{
        this.loadSeries();
    }
  render() {
    return (
      <div style={{padding:"5%",textAlign:"center"}}>
        {
            this.state.status == true &&
            (<Navigate to={"/"}/>)
        }
        <h1>Nuevo Personaje</h1>
        <form className='form' onSubmit={this.createPersonaje}>
            <label className='form-label'>Nombre</label>
            <input ref={this.cajaNombre} className='form-control'></input>
            <label className='form-label'>Imagen</label>
            <input ref={this.cajaImagen} className='form-control'></input>
            <label className='form-label'>Serie</label>
            <select ref={this.selectSerie} className="form-select">
                {
                    this.state.series.map((serie,index) =>{
                        return(
                            <option key={index} value={serie.idSerie}>
                                {serie.nombre}
                            </option>
                        )
                    })
                }
            </select><br></br>
            <button className='btn btn-primary'>Crear</button>
        </form>
      </div>
    )
  }
}
