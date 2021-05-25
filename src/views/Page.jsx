import React from 'react';
import PageTable from '../components/PageTable';
import PageForm from '../components/PageForm';
import PageMessage from '../components/PageMessage';
import { Storage } from "../utils/Storage";

export default class Page extends React.Component {
    constructor (props) {
        super(props);        
        this.props = props;
        this.state = {
            lists : [],
            inputValues : ["nombre del puesto", "empresa", "ciudad", "pais",],
            result : ["","","",""],
            message : "",
            countries: [],
            cities: [],
            citiesOptions: [{name: 'Seleccione un Pais', country: null}],
            companies: [],
            companiesOptions: [{name: 'Seleccione una Ciudad', city: null}],
        }
        this.handleInput = this.handleInput.bind(this);
        this.addRow = this.addRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
    }

    componentDidMount() {
      this.setState({
        countries: Storage.getData('countries'),
        cities: Storage.getData('cities'),
        companies: Storage.getData('companies'),
        lists: Storage.getData('jobs')
      })
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
          name: this.state.result[3],
          company: this.state.result[2],
          city: this.state.result[1],
          country: this.state.result[0],
        };
        let newArr = [...this.state.lists]; 
        newArr.push(auxJob);
        this.setState({
          lists: newArr
        });                                  
      } else {
        this.setState({ message : "error" });
      }                                                                                                                                                                        
    } 
     
    removeRow(index) {
      //console.log("index:" + index);
      if (index >= 0) {
        let remArr = [...this.state.lists]; 
        remArr.splice(index, 1);
        this.setState({
          lists: remArr
        })
      }                                                                                                                                                                                                                                                                                                                                                 
    } 
    
    handleInput(event, index) {
      let newArr = [...this.state.result]; 
      newArr[index] = event.target.value;
      this.setState({
        result: newArr
      })
      if(event.target.id === 'formCountry'){ 
        this.setState({citiesOptions: Storage.filterData('cities','country',event.target.value) });
      }
      if(event.target.id === 'formCity'){ 
        this.setState({companiesOptions: Storage.filterData('companies','city',event.target.value) });
      }
    } 

    render () {                      
        return (
          <div className="container">
            <br/>           
            <div>
              <PageMessage message={this.state.message}/>              
            </div>
            <div className="row">
              <div className="col">             
                <PageForm 
                  inputs={this.state.inputValues} 
                  onChange={this.handleInput} 
                  onAdd={this.addRow}
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
                  onRemove={this.removeRow}
                />                 
              </div>
            </div>
          </div>
        )
    }
}

