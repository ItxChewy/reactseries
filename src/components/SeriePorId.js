import axios from 'axios'
import React, { Component } from 'react'
import Global from '../Global'
import VerPersonaje from './VerPersonaje'
import { NavLink } from 'react-router-dom'

export default class SeriePorId extends Component {

    state = {
        serie: [],
    }

    loadSerie = () => {
        let request = "api/series/" + this.props.id
        axios.get(Global.urlApi + request).then(response => {
            this.setState({
                serie: response.data
            })
        })
    }

    

    componentDidMount = () => {
        this.loadSerie()
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.id != this.props.id) {
            this.loadSerie()
        }
    }

    render() {
        return (
            <div style={{ padding: "5%" }}>
                
                
                        <div>
                    <h1>SERIE FILTRADA POR ID</h1>
                    <img src={this.state.serie.imagen} style={{ height: "200px", width: "200px" }} />
                    <h3>{this.state.serie.nombre}</h3>
                    <p>IMDB:{this.state.serie.puntuacion}</p>
                    <NavLink to={"/personajes/" + this.props.id}>
                    <button className='btn btn-success'>
                    Personajes
                    </button>
                    </NavLink>
                    
                </div>
            </div>
        )
    }
}
