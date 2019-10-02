import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      planet: {
        name: '',
        population: '', 
        climate:'',
        terrain: '',
        films: [],
      },
      loading: false,
    };
  }

  componentDidMount() {
    this.loadPlanets();
  }

  swPlanets = async (planet) => {
    const response = await api.get(`/planets/${planet}`);
    return response;
  }

  loadPlanets = async () => {    
    let i = Math.floor(Math.random() * 61 + 1);
    this.setState({ loading: true });
    this.swPlanets(i)
      .then(planet => {
        this.setState({
          planet: planet.data,
          loading: false,
        })
      }).catch(() =>{
        this.setState({
          loading: false,
        })
      })
  };

  renderLoading() {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  renderPlanet = () => {
    const { planet } = this.state;
    return (
      <div className="planet-details">
        <header className="header">
          <h1>Planet {planet.name}</h1>
        </header>
        <ul className="list">            
          <li><span>Population:</span> <span>{planet.population}</span></li>
          <li><span>Climate:</span> <span>{planet.climate}</span></li>
          <li><span>Terrain:</span> <span>{planet.terrain}</span></li>
        </ul>
        <p>Featured in {planet.films.length} films</p>
      </div>
    );
  }

  renderButton = () => {
    return (
      <div className="actions">
        <button onClick={this.loadPlanets}>
          Next &raquo;
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="planet-card">
        {this.renderPlanet()}
        {this.renderButton()}
        {this.state.loading ? this.renderLoading() : ""}
      </div>
    );
  }
}
