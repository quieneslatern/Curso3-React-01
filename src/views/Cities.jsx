import React from 'react';
import { Storage } from "../utils/Storage";
import {
	createCountry,
	deleteCountry,
  getCountry,
	getAllCountries, 
	createCity,
	deleteCity,
	getAllCities,    
} from '../rest/backend';

export class Cities extends React.Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      cities: [],
      city: {}
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
    getAllCities()
      .then((cities) =>
        this.setState({
          cities: cities
        })  
      )
      .catch(() =>
        this.setState({
          withError: true,
        })
      );    
  }

  addCity = () => {
    let city = document.getElementById('city').value;
    let country = document.getElementById('country').value;
    
    let auxCity = { 
      name: city,
      countrieId: country
    };
    
    createCity(auxCity)
      .then((createdCity) => {
        this.setState({
          cities: [...this.state.cities, createdCity]
        })  
      })    
  }

  findById = (id) => {
    id = parseInt(id) 
    //console.log('id:' + id)
    //console.log(JSON.stringify(this.state.countries))
    let auxCountry = this.state.countries.filter((country) => country.id === id)
    if(auxCountry.length > 0 ) {
      //console.log(JSON.stringify(auxCountry) + ' - ' + id)
      return auxCountry[0].name
    } else {
      return 'Sin Pais'
    }
  }

  removeCity = (id) => {
    deleteCity(id)
      .then((id) => {
        const newArr = this.state.cities.filter((city) => city.id !== id);
        this.setState({
				  cities: newArr,
			})
    })
  }


  saveData = () => {
    Storage.setData('cities', this.state.cities)
  }

  render() {
    return (
      <div className="container">
        <h1>Ciudades</h1>
        <div className="row">
          <div className="col">           
            <select id="country">
              { 
                this.state.countries.map((item, index) => { 
                  return ( 
                    <option 
                      key={index} 
                      value={item.id}
                    >
                      { item.name }
                    </option> 
                  )
                })
              }   
            </select>
            <input id="city" /> 
            <button onClick={this.addCity}>Agregar</button>
              
            
          </div>
          <div className="col">
            <ul>
            { 
              this.state.cities.map((item, index) => { 
                return (
                  <li key={index}>
                    { item.name } - 
                    {this.findById(item.countrieId)}
                    <button 
                      className="btn btn-danger" 
                      onClick={() => this.removeCity(item.id)}>
                        X
                    </button>
                  </li> 
                )
              })
            }   
            </ul>
          </div>
        </div>
      </div>
    );
  }
}