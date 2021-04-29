import React from 'react';

export default class PageForm extends React.Component {
    constructor (props) {
        //console.log("Form" + JSON.stringify(props));
        super(props);
        this.state = {
            inputValues: this.props.inputs,
        }
    }

    render () {
        return ( 
          <>              
            <div className="form-group">
                  { this.state.inputValues.map(
                    (inputValue, index) => {
                      return (  
                        <span key={index} className="row">
                          <label htmlFor={"form" + index} className="col-sm-2 col-form-label">
                            { inputValue }: 
                          </label>
                          <div className="col-sm-10">
                            <input 
                              className="form-control"
                              id={"form" + index}
                              key={index}  
                              onChange={(e) => this.props.onChange(e, index)} 
                              type="text"
                            />
                          </div> 
                        </span>
                      )
                    } 
                    )                        
                  }                          
                </div>                         
                <div className="form-group row">
                  <div className="col-sm-10">
                    <button onClick={ () => this.props.onAdd() } className="btn btn-primary">Agregar</button>                  
                  </div>
                </div>
            </>
        )
    }
}

