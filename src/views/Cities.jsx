import React from 'react';
import { Storage } from "../utils/Storage";

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
    this.setState({
        countries: Storage.getData('countries'),
        cities: Storage.getData('cities'),
    })
  }

  addCity = () => {
    let city = document.getElementById('city').value;
    let country = document.getElementById('country').value;
    //let city = 'asdas';
    //let country = 'country';
    
    let auxCity = { 
      id: Storage.nextID(this.state.cities),
      name: city,
      country: country
    };
    
    this.setState({
      cities: [...this.state.cities, auxCity]
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
                  return <option key={index} value={item.id}>{ item.name }</option> 
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
                return <li key={index}>{ item.name } - {Storage.findById('countries', item.country)}</li> 
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