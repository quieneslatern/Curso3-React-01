import React from 'react';
import { Storage } from "../utils/Storage";

export class Countries extends React.Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      country: ""
    };
  }

  componentDidMount() {
    this.setState({
      countries: Storage.getData('countries')
    })
  }

  setCountry = (e) => {
    this.setState({
      country: e.target.value
    })
  } 

  addCountry = () => {
    let auxCountry = { 
      id: Storage.nextID(this.state.countries),
      name: this.state.country,
    };
    this.setState({
      countries: [...this.state.countries, auxCountry]
    })
  }

  saveData = () => {
    Storage.setData('countries', this.state.countries)
  }

  render() {
    return (
      <div className="container">
        <h1>Paises</h1>
        <div className="row">
          <div className="col">             
            
              <input onChange={(e) => this.setCountry(e)}/>
              <button onClick={this.addCountry}>Agregar</button>
              
            
          </div>
          <div className="col">
            <ul>
            { 
              this.state.countries.map((item, index) => { 
                return <li key={index}>{ item.name }</li> 
              })
            }   
            </ul>
            <button onClick={this.saveData}>Guardar</button>
          </div>
        </div>
      </div>
    );
  }
}

