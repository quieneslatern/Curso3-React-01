import React from 'react';

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

    render () {
        const {headers, values} = this.state;
        return (                 
            <table>
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
                            { row.map((item, index2) => { 
                            return <td key={index2}>{ item }</td> 
                            } 
                            )}
                            <td>
                                <button className="btn btn-danger" onClick={() => this.props.onRemove(index)}>X</button>
                            </td>
                        </tr>
                        )} )
                    } 
                </tbody>
            </table>
        )
    }
}

