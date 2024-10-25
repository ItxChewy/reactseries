import axios from 'axios'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global'

export default class MenuSeries extends Component {
    state = {
        series:[]
    }

    loadSeries = () =>{
        let request = "api/series"
        axios.get(Global.urlApi + request).then(response =>{
            this.setState({
                series:response.data
            })
        })
    }

    componentDidMount = () =>{
        this.loadSeries();
    }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand nav-link" to="/">Home</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarsExample03">
                            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/create">Nuevo Personaje</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/update">Modificar personajes</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Lista series</a>
                                    <ul className="dropdown-menu">
                                        {
                                            this.state.series.map((serie,index) =>{
                                                return(
                                                    <li key={index}>
                                                        <NavLink to={"/serie/" + serie.idSerie} className={"dropdown-item"}>{serie.nombre}</NavLink>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
      </div>
    )
  }
}
