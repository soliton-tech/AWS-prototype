import React, { Component } from 'react';
import axios from 'axios';
import MainPage from './components/mainpage/mainpage';

import './App.css';


class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false
  };

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0]})
  }

  onFileUpload = event => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    axios.post("https://qzcrf0o2oi.execute-api.us-east-1.amazonaws.com/prod/file-upload", formData).then((response) => {
      this.setState({ selectedFile: null});
      this.setState({ fileUploadedSuccessfully: true});
    });
  }

  fileData = () => {
    if(this.state.selectedFile){
      return(
        <div>
        <h2>File Details:</h2>
        <p>File Name: {this.state.selectedFile.name}</p>
        <p>File Type: {this.state.selectedFile.type}</p>
        <p>Last Modified: {" "}
          {this.state.selectedFile.lastModifiedDate.toDateString()}
        </p>
      </div>
      );
    }else if(this.state.fileUploadedSuccessfully){
      return(
        <div>
          <br />
          <h4>Your file has been uploaded successfully</h4>
        </div>
      );
    }else{
      return(
        <div>
          <br />
          <h4>Choose a file and then press the upload button</h4>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="main-container">
        <MainPage></MainPage>
      </div>
    )
  }
}

export default App;
