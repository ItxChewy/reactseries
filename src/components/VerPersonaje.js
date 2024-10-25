import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Global from '../Global'

export default class VerPersonaje extends Component {
    state = {
        personajes:[]
    }
    loadPersonajes = () =>{
        console.log()
        let request = "api/series/personajesserie/" + this.props.id
        axios.get(Global.urlApi + request).then(response =>{
            this.setState({
                status:false,
                personajes:response.data
            })
        })
    }
    componentDidMount = () =>{
        this.loadPersonajes();
    }
  render() {
    return (
      <div style={{padding:"5%"}}>
        <h1>Personajes</h1>
        <NavLink to={"/serie/" + this.props.id}>
            <button className='btn btn-primary'>
                Atras
            </button>
        </NavLink>
        <table className='table table-bordered table-striped table-dark'>
            <thead>
                <tr>
                    <th>Personaje</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody>
        
        {
            this.state.personajes.map((personaje,index) =>{
                return(
                    <tr key={index}>
                        <td>{personaje.nombre}</td>
                        <td>
                            <img src={personaje.imagen} style={{height:"150px",width:"150px"}}/>
                        </td>
                    </tr>
                )
            })
        }
        </tbody>
        </table>
      </div>
    )
  }
}
