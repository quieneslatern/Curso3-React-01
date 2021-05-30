import React from 'react';
import { Storage } from "../utils/Storage";
import {
	createCountry,
	deleteCountry,
  getCountry,
	getAllCountries, 
	createCity,
	deleteCity,
  getCity,
	getAllCities,
	createCompany,
	deleteCompany,
	getAllCompanies,    
} from '../rest/backend';

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
    getAllCompanies()
      .then((companies) =>
        this.setState({
          companies: companies
        })  
      )
      .catch(() =>
        this.setState({
          withError: true,
        })
      );      
  }

  addCompany = () => {
    let city = document.getElementById('city').value;
    let company = document.getElementById('company').value;
    if (city.trim() === '' && company.trim() === '') {
      return true;
    }

    let auxCompany = { 
      name: company,
      placeId: city
    };
    createCompany(auxCompany)
      .then((createdCompany) => {
        this.setState({
          companies: [...this.state.companies, createdCompany]
        })  
      })    
  }

  findById = (id) => {
    id = parseInt(id) 
    //console.log('id:' + id)
    //console.log(JSON.stringify(this.state.countries))
    let auxCity = this.state.cities.filter((city) => parseInt(city.id) === id)
    if(auxCity.length > 0 ) {
      //console.log(JSON.stringify(auxCountry) + ' - ' + id)
      return auxCity[0].name
    } else {
      return 'Sin Ciudad'
    }
  }

  removeCompany = (id) => {
    deleteCompany(id)
      .then((id) => {
        const newArr = this.state.companies.filter((company) => company.id !== id);
        this.setState({
				  companies: newArr,
			})
    })
  }

  inputChange(e) {
    if(e.target.id === 'country'){ 
      let aux = this.state.cities.filter(items => items.countrieId === e.target.value);
      this.setState({citiesOptions: aux });
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
                    { item.name } - 
                    {this.findById(item.placeId)} 
                    <button 
                      className="btn btn-danger" 
                      onClick={() => this.removeCompany(item.id)}>
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
