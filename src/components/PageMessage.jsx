import React from 'react';

export default class PageMessage extends React.Component {
    constructor (props) {
        //console.log("Message" + JSON.stringify(props));
        super(props);
        this.state = {
            message: this.props.message,
        }
        this.aux = (<></>);
    }

    componentDidUpdate(prevProps){
        if(prevProps.message !== this.props.message){
            this.setState({          
                message: this.props.message
            });
        }
    }

    viewMessage() {
        
        if (this.state.message === 'error') {
            this.aux = (
                <div className="alert alert-danger" role="alert">
                    Debe completar todos los campos
                </div>
            );
        } 
        else if (this.state.message === 'success') {
            this.aux = (
                <div className="alert alert-success" role="alert">
                    Se grabo con exito
                </div>
            );
        }
        return this.aux
    }

    render () {
        return this.viewMessage();
    }
}
