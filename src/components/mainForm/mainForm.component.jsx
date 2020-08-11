import React from 'react';
// import FormInput from '../form-input/form-input.component';
// import CustomButton from '../custom-button/custom-button.component';
import CSVReader from 'react-csv-reader';

import './mainForm.styles.scss';
import { Form, Button, Table, Alert } from 'react-bootstrap';

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header =>
    header
      .toLowerCase()
      .replace(/\W/g, '_')
}

const RenderRow = (csvData) =>{
  return csvData.keys.map((key, index)=>{
  return <td key={csvData.data[key]}>{csvData.data[key]}</td>
  })
}

class MainForm extends React.Component {
    constructor() {
      super();

      this.state = {
          csvData: [{}],
          token: '',
          isGoing: false,
          response: 'Ups',
          responseType: 'success'      
      }
    }

    getKeys = () => {
      try {
        const keys = Object.keys(this.state.csvData[0]);
        return keys;
      } catch (error) {
        console.log('invalid json format')
      }
    }
    
    getHeader = () => {
      var keys = this.getKeys();
        if(keys) {
          return keys.map((key, index)=>{
          return <th key={key}>{key.toUpperCase()}</th>
        })
      }
    }

    getRowsData = () => {
      var items = this.state.csvData;
      var keys = this.getKeys();
      try {
        return items.map((row, index)=>{
        return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
      } catch (error) {
        console.log('invalid json format')
      }
    }

    handleInputChange = (event) => {
      console.log(event.target);
      console.log(event.target.value);
      console.log(event.target.name);
      const {name, value} = event.target;
      if(this.state.isGoing && name === 'csvData') {
        this.setState({ csvData: JSON.parse(value)})
      } else {
        this.setState({ [name]: value });
      }
    }

    handleSubmit = async (event) => {
      event.preventDefault();
      console.log('olisubmit')
    }


    render () {       
        var { csvData, token, isGoing, response, responseType } = this.state;
        csvData = JSON.stringify(csvData);
        const handleForce = (data, fileInfo) => {
          this.setState({csvData: data});
        }
        return(
            <div className="container">
                
              <Form className='main-form-form' onSubmit={this.handleSubmit}>
                <div className="row">
                    <label>Seleccione csv</label>
                </div>
                <div className="row">
                  <div className="col">
                    <CSVReader
                      cssClass="react-csv-input"
                      onFileLoaded={handleForce}
                      parserOptions={papaparseOptions}
                    />
                  </div>
                  <div className='col xs'>
                    <Form.Check type="checkbox" label="Ingreso manual" name='isGoing' value={isGoing} onChange={this.handleInputChange}/>
                  </div>
                </div>
                <div className="row mt-3">
                  <Form.Control placeholder='Data' as="textarea" name='csvData' rows="4" value={csvData} onChange={this.handleInputChange} disabled={!isGoing} />
                </div>
                <div className="row mt-3">
                  <Form.Control
                    required
                    name='token'
                    type="text"
                    placeholder="Token"
                    value={token}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="row mt-3">
                  <Button variant='primary' type='submit' block>
                    Upload
                  </Button>
                </div>
              </Form>
                <div className="row mt-3">
                  <label>Data preview</label>
                  <Table striped bordered hover>  
                    <thead>
                      <tr>{this.getHeader()}</tr>
                    </thead>
                    <tbody>
                      {this.getRowsData()}
                    </tbody>
                  </Table>
                </div>
                <div className="row mt-3">
                  { response && 
                  <Alert variant={responseType}>
                    {response}
                  </Alert>
                  }
                </div>
            </div>
        )
    }
}

export default MainForm;