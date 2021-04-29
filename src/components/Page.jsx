import React from 'react';
import PageTable from './PageTable';
import PageForm from './PageForm';
import PageMessage from './PageMessage';

export default class Page extends React.Component {
    constructor (props) {
        super(props);        
        this.props = props;
        this.state = {
            lists : [],
            inputValues : ["nombre del puesto", "empresa", "ciudad", "pais",],
            result : ["","","",""],
            message : "",
        }
        this.handleInput = this.handleInput.bind(this);
        this.addRow = this.addRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
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
        let newArr = [...this.state.lists]; 
        newArr.push(this.state.result);
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
    } 

    render () {                      
        return (
          <div className="container">
            <div>
              <PageMessage message={this.state.message}/>
            </div>
            <div className="row">
              <div className="col">             
                <PageForm 
                  inputs={this.state.inputValues} 
                  onChange={this.handleInput} 
                  onAdd={this.addRow}
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

