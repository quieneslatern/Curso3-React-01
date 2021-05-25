import React from 'react';
import { Storage } from "../utils/Storage";

export class Companies extends React.Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      cities: [],
      citiesOptions: [{name: 'Seleccione un Pais', country: null}],
      companies: [],
    };
  }

  componentDidMount() {
    this.setState({
        countries: Storage.getData('countries'),
        cities: Storage.getData('cities'),
        companies: Storage.getData('companies')
    })
  }

  addCompany = () => {
    let city = document.getElementById('city').value;
    let company = document.getElementById('company').value;
    if (city.trim() === '' && company.trim() === '') {
      return true;
    }

    let auxCompany = { 
      name: company,
      city: city
    };
    
    this.setState({
      companies: [...this.state.companies, auxCompany]
    })
  }

  inputChange(e) {
    if(e.target.id === 'country'){ 
      this.setState({citiesOptions: Storage.filterData('cities','country',e.target.value) });
    }
  }

  saveData = () => {
    Storage.setData('companies', this.state.companies)
  }

  render() {
    return (
      <div className="container">
        <h1>Empresas</h1>
        <div className="row">
          <div className="col">
            <div className="row">
              <input id="company" />
            </div>
            <div className="row">
              <select id="country" onChange={(e) => this.inputChange(e)}>
                <option value="">
                  Elegir Pais
                </option>
                { 
                  this.state.countries.map((item, index) => { 
                    return (
                      <option key={index} value={item.id}>
                        { item.name }
                      </option> 
                    )
                  })
                }   
              </select>
            </div>
            <div className="row">
              <select id="city">
                <option value="">
                  Elegir Ciudad
                </option>
                { 
                  this.state.citiesOptions.map((item, index) => { 
                    return (
                      <option key={index} value={item.id}>
                        { item.name }
                      </option> 
                    )
                  })
                }   
              </select>
            </div>
            <div className="row"> 
              <button onClick={this.addCompany}>Agregar</button>
            </div>
          </div>
          <div className="col">
            <ul>
            { 
              this.state.companies.map((item, index) => { 
                return (
                  <li key={index}>
                    { item.name } - {Storage.findById('cities', item.city)} 
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
