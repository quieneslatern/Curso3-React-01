import React from 'react';
import { Storage } from "../utils/Storage";

export default class PageTable extends React.Component {
    constructor (props) {
        super(props);
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

    saveData = () => {
      Storage.setData('jobs', this.state.values)
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
                        return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.name}</td> 
                            <td>{Storage.findById('companies', row.company)}</td> 
                            <td>{Storage.findById('cities', row.city)}</td> 
                            <td>{Storage.findById('countries', row.country)}</td> 
                            <td>
                                <button className="btn btn-danger" onClick={() => this.props.onRemove(index)}>X</button>
                            </td>
                        </tr>
                        )} )
                    } 
                    <tr>
                        <td colspan="6" align="center">
                            <button onClick={this.saveData}>Guardar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

