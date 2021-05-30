import React from 'react';
import PageTable from '../components/PageTable';
import PageForm from '../components/PageForm';
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
  createJob,
  deleteJob,
  getJob,
  getAllJobs,
  updateJob
} from '../rest/backend';

export default class Page extends React.Component {
    constructor (props) {
        super(props);        
        this.props = props;
        this.state = {
            lists: [],
            inputValues: ["nombre del puesto", "descripcion del puesto", "empresa", "ciudad", "pais",],
            result: ["","","","",""],
            edit: {edit: false, id: ""},
            message: "",
            countries: [],
            cities: [],
            citiesOptions: [{name: 'Seleccione un Pais', country: null}],
            companies: [],
            companiesOptions: [{name: 'Seleccione una Ciudad', city: null}],
        }
        this.handleInput = this.handleInput.bind(this);
        this.addRow = this.addRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.updateRow = this.updateRow.bind(this);
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
      getAllJobs()
        .then((jobs) =>
          this.setState({
            lists: jobs
          })  
        )
        .catch(() =>
          this.setState({
            withError: true,
          })
        );              
      
    }

    isEmpty(collection) {
      for (var i=0; i<collection.length; i++){
        if (collection[i].trim() === '') {
          return true;
        }
      }
      return false;
    }
     
    addRow() {
      //console.log("add");
      if (this.isEmpty(this.state.result) === false) {
        this.setState({ message : "success" });

        let auxJob = { 
          position: this.state.result[3],
          description: this.state.result[4],
          organizationId: this.state.result[2],          
        };

        createJob(auxJob)
        .then((createdJob) => {
          this.setState({
            lists: [...this.state.lists, createdJob]
          })  
        })          
      } else {
        this.setState({ message : "error" });
      }                                                                                                                                                                        
    } 
     
    removeRow(id) {
      id = parseInt(id)
      deleteJob(id)
        .then((id) => {
          const newArr = this.state.lists.filter((job) => parseInt(job.id) !== id);
          this.setState({
            lists: newArr,
          })
        })      
    } 

    findDataById = (data, id) => {
        id = parseInt(id)
        let result
  
        if(data === 'countries') { 
          result = this.state.countries.filter((country) => parseInt(country.id) === id)
        } 
        if(data === 'cities') { 
          result = this.state.cities.filter((city) => parseInt(city.id) === id)
        } 
        if(data === 'companies') { 
          result = this.state.companies.filter((company) => parseInt(company.id) === id)
        } 
        if(data === 'jobs') { 
          result = this.state.lists.filter((job) => parseInt(job.id) === id)
        } 
        if(result.length > 0 ) {
          return result[0]
        } else {
          return 'Sin Datos'
        }
      }

    editRow(id) {      
      id = parseInt(id)
      let job = this.findDataById('jobs', id)
      let company = this.findDataById('companies', job.organizationId)
      let city = this.findDataById('cities', company.placeId)      
      let edit = {edit: true, id:id}
      let aux = [city.countrieId, city.id, company.id, job.position, job.description]
      
      console.log(id)

      this.setState({ 
        edit: edit,
        result: aux,
        companiesOptions: this.state.companies.filter(items => parseInt(items.placeId) === parseInt(city.id)), 
        citiesOptions: this.state.cities.filter(items => parseInt(items.countrieId) === parseInt(city.countrieId))        
      });
      
    }

    updateRow(id) {
      let auxJob = { 
        position: this.state.result[3],
        description: this.state.result[4],
        organizationId: this.state.result[2],          
      };
      updateJob(id, auxJob)
        .then(() => {
          //let updArr = this.state.lists.filter((job) => parseInt(job.id) !== parseInt(id))
          let updArr = this.state.lists
          let index = updArr.findIndex(job => parseInt(job.id) === parseInt(id));
          auxJob.id = id
          updArr[index] = auxJob
          this.setState({
            lists: updArr
          })
        })
        
      this.setState({ 
        edit: {edit: false, id:null },
        result: ["","","","",""],
      })
      console.log(id)      
    }
    
    handleInput(event, index) {
      let newArr = [...this.state.result]; 
      newArr[index] = event.target.value;
      this.setState({
        result: newArr
      })
      let id = parseInt(event.target.value)
      if(event.target.id === 'formCountry'){ 
        let aux = this.state.cities.filter(items => parseInt(items.countrieId) === id);
        this.setState({citiesOptions: aux });
      }
      if(event.target.id === 'formCity'){ 
        let aux = this.state.companies.filter(items => parseInt(items.placeId) === id);
        this.setState({companiesOptions: aux });
      }
    } 

    render () {                      
        return (
          <div className="container">
            <br/>
            <div className="row">
              <div className="col">             
                <PageForm 
                  inputs={this.state.inputValues} 
                  values={this.state.result} 
                  edit={this.state.edit} 
                  onChange={this.handleInput} 
                  onAdd={this.addRow}
                  onUpdate={this.updateRow}
                  countries={this.state.countries}
                  cities={this.state.cities}
                  companies={this.state.companies}
                  citiesOptions={this.state.citiesOptions}
                  companiesOptions={this.state.companiesOptions}
                />
              </div>
              <div className="col">   
                <PageTable 
                  headers={this.state.inputValues} 
                  values={this.state.lists} 
                  countries={this.state.countries}
                  cities={this.state.cities}
                  companies={this.state.companies}
                  onRemove={this.removeRow}
                  onEdit={this.editRow}
                  findDataById={this.findDataById}
                />                 
              </div>
            </div>
          </div>
        )
    }
}

