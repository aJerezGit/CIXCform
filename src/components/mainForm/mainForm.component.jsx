import React from 'react';
// import FormInput from '../form-input/form-input.component';
// import CustomButton from '../custom-button/custom-button.component';
import CSVReader from 'react-csv-reader';

import './mainForm.styles.scss';
import { Form, Button, Table } from 'react-bootstrap';

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
          token: ''
      }
    }

    getKeys = () => {
      const keys = Object.keys(this.state.csvData[0]);
      return keys;
    }
    
    getHeader = () => {
      var keys = this.getKeys();
      return keys.map((key, index)=>{
      return <th key={key}>{key.toUpperCase()}</th>
      })
    }

    getRowsData = () => {
      var items = this.state.csvData;
      var keys = this.getKeys();
      return items.map((row, index)=>{
      return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
      })
    }


    render () {       
        var { csvData, token } = this.state;
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
                    <label>
                      <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                        ' Ingreso manual'
                    </label>
                  </div>
                </div>
                <div className="row mt-3">
                  <Form.Control placeholder='Data' as="textarea" rows="4" value={csvData} />
                </div>
                <div className="row mt-3">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Token"
                    value={token}
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
            </div>
        )
    }
}

export default MainForm;