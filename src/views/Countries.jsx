import React from 'react';
import {
	createCountry,
	deleteCountry,
	getAllCountries,    
} from '../rest/backend';
export class Countries extends React.Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      country: ""
    };
  }

  componentDidMount() {
    getAllCountries()
      .then((countries) =>
        this.setState({
          countries: countries
        })  
      )
      .catch(() =>
        this.setState({
          withError: true,
        })
      );    
  }

  setCountry = (e) => {
    this.setState({
      country: e.target.value
    })
  } 

  addCountry = () => {
    let auxCountry = { 
      name: this.state.country,
    };
    createCountry(auxCountry)
      .then((createdCountry) => {
        this.setState({
          countries: [...this.state.countries, createdCountry]
        })  
      })    
  }

  removeCountry = (id) => {
    deleteCountry(id)
      .then((id) => {
        const newArr = this.state.countries.filter((country) => country.id !== id);
        this.setState({
				  countries: newArr,
			})
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
                return (
                  <li key={index}>
                    { item.name } 
                    <button 
                      className="btn btn-danger" 
                      onClick={() => this.removeCountry(item.id)}>
                        X
                    </button>
                  </li>
                ) 
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

