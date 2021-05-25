import React from 'react';

export default class PageForm extends React.Component {
    constructor (props) {
        //console.log("Form" + JSON.stringify(props));
        super(props);
        this.props = props;
        this.state = {
            inputValues: this.props.inputs,
        }
    }

    render () {
        return ( 
          <>              
            <div className="form-group">
              <span className="row">
                <label htmlFor="formCountry" className="col-sm-4 col-form-label">
                  Pais: 
                </label>
                <div className="col-sm-8">
                  <select 
                    className="form-control"
                    id="formCountry"
                    onChange={(e) => this.props.onChange(e, 0)} 
                    type="text"
                  >
                    <option value="">
                      Elegir Pais
                    </option>
                    { 
                      this.props.countries.map((item, index) => { 
                        return (
                          <option key={index} value={item.id}>
                            { item.name }
                          </option> 
                        )
                      })
                    }
                  </select>
                </div>
              </span><span className="row">
                <label htmlFor="formCity" className="col-sm-4 col-form-label">
                  Ciudad: 
                </label>
                <div className="col-sm-8">
                  <select 
                    className="form-control"
                    id="formCity"
                    onChange={(e) => this.props.onChange(e, 1)} 
                    type="text"
                  >
                    <option value="">
                      Elegir Ciudad
                    </option>
                    { 
                      this.props.citiesOptions.map((item, index) => { 
                        return (
                          <option key={index} value={item.id}>
                            { item.name }
                          </option> 
                        )
                      })
                    }   
                  </select>
                </div> 
              </span> 
              <span className="row">
                <label htmlFor="formCompany" className="col-sm-4 col-form-label">
                  Empresa: 
                </label>
                <div className="col-sm-8">
                  <select 
                    className="form-control"
                    id="formCompany"
                    onChange={(e) => this.props.onChange(e, 2)} 
                    type="text"
                  >
                    <option value="">
                      Elegir Empresa
                    </option>
                    { 
                      this.props.companiesOptions.map((item, index) => { 
                        return (
                          <option key={index} value={item.id}>
                            { item.name }
                          </option> 
                        )
                      })
                    }   
                  </select>
                </div> 
              </span> 
              <span className="row">
                <label htmlFor="formPuesto" className="col-sm-4 col-form-label">
                  Puesto: 
                </label>
                <div className="col-sm-8">
                  <input 
                    className="form-control"
                    id="formJob"
                    onChange={(e) => this.props.onChange(e, 3)} 
                    type="text"
                  />
                </div> 
              </span>                                  
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

