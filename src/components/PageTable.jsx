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
    createJob,
    deleteJob,
    getJob,
    getAllJobs
} from '../rest/backend';

export default class PageTable extends React.Component {
    constructor (props) {
        super(props);
        this.props = props;
        this.state = {
            headers: this.props.headers,
            values: this.props.values
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.values !== this.props.values){
            this.setState({          
                values: this.props.values
            });
        }
    }

    render () {
        const {headers, values} = this.state;
        return (                 
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>#</th>
                    { headers.map(
                        (title, index) => {return  <th key={index} >{ title }</th> } 
                        )
                    }
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    { values.map((row, index) => { 
                        let company = this.props.findDataById('companies', row.organizationId)
                        let city = this.props.findDataById('cities', company.placeId)
                        let country = this.props.findDataById('countries', city.countrieId)
                        return (
                        <tr key={row.id}>
                            <td>{index + 1}</td>
                            <td>{row.position}</td> 
                            <td>{row.description}</td>  
                            <td>{company.name}</td>  
                            <td>{city.name}</td>  
                            <td>{country.name}</td>  
                            <td>
                                <button className="btn btn-danger" onClick={() => this.props.onRemove(row.id)}>X</button>
                            </td>
                            <td>
                                <button className="btn btn-info" onClick={() => this.props.onEdit(row.id)}>Editar</button>
                            </td>
                        </tr>
                        )} )
                    } 
                </tbody>
            </table>
        )
    }
}

