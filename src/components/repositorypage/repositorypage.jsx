import React, { Component } from "react";
import axios from "axios";

import "./repositorypage.css";
import "../../Global.css";

const aws = require("aws-sdk");

class RepositoryPage extends React.Component {
  state = {
    bucketName: "solitonresearchbucket",
    subFolder: "input",
    message: "Total Records found : 0",
    showImportOption: false,
    selectedFile: undefined,
    data: [],
    dataHeader: {
      Key: "File Name",
      LastModified: "Last Modified Date",
      Size: "File Size",
      Source: "Source",
    },
    isUploadingInProgress: false,
    isRefreshInProgress: false,
  };

  componentDidMount() {
    this.refreshRepository();
  }

  getChooseFileButtonClass = () => {
    return this.state.selectedFile == undefined ? "" : "hide";
  };

  getImportOptionClass = () => {
    var classNames = "repository-import";
    if (this.state.isUploadingInProgress || this.state.isRefreshInProgress) {
      classNames += " disable";
    }
    if (this.state.showImportOption == false) {
      classNames += " hide";
    }
    return classNames;
  };

  getRepositoryActionButtonClass = () => {
    return this.state.isUploadingInProgress || this.state.isRefreshInProgress ? "repository-actions disable" : "repository-actions";
  };

  getRepositoryContainerClass = () => {
    var classNames = "repository-container";
    if (this.state.isUploadingInProgress || this.state.isRefreshInProgress) {
      classNames += " disable";
    }
    if (this.state.showImportOption == true) {
      classNames += " hide";
    }
    return classNames;
  };

  getUploadFileButtonClass = () => {
    return this.state.selectedFile == undefined ? "hide" : "";
  };

  cancelchooseFile = () => {
    document.querySelector("#importFile").value = "";
    this.setState({
      showImportOption: false,
      selectedFile: undefined,
    });
  };

  cancelImportFile = () => {
    document.querySelector("#importFile").value = "";
    this.setState({ selectedFile: undefined });
  };

  chooseFile = () => {
    var _self = this;
    document.querySelector("#importFile").onchange = function () {
      if (this.files[0] == undefined) {
        return;
      }

      _self.setState({ selectedFile: this.files[0] });
    };

    document.querySelector("#importFile").click();
  };

  generateTable = () => {
    let tbl = document.querySelector("#repository-table");
    tbl.innerHTML = "";

    let tblBody = document.createElement("tbody");

    //append header
    let tr = document.createElement("tr");
    for (const [key, value] of Object.entries(this.state.dataHeader)) {
      let cell = document.createElement("th");
      let cellText = document.createTextNode(value);
      cell.appendChild(cellText);
      tr.appendChild(cell);
    }

    tblBody.appendChild(tr);

    this.state.data.forEach((row) => {
      let tr = document.createElement("tr");

      for (const [key, value] of Object.entries(row)) {
        if (Object.keys(this.state.dataHeader).includes(key)) {
          let cell = document.createElement("td");
          let cellText = document.createTextNode(value);
          cell.appendChild(cellText);
          tr.appendChild(cell);
        }
      }
      tblBody.appendChild(tr);
    });

    tbl.appendChild(tblBody);
  };

  getFileName = () => {
    return this.state.selectedFile != undefined ? this.state.selectedFile.name : "empty";
  };

  processData = async (data) => {
    const s3 = new aws.S3();

    data = data.filter((d) => {
      return d.Key.startsWith("input/") && d.Key != "input/";
    });

    data = data.map(async (d) => {
      d.Key = d.Key.substring(6);
      d.Size = d.Size + " B";

      let tagResponse = await s3
        .getObjectTagging({
          Bucket: this.state.bucketName,
          Key: `${this.state.subFolder}/${d.Key}`,
        })
        .promise();
      d.Source = tagResponse.TagSet.length > 0 ? tagResponse.TagSet[0].Value : "-";

      return d;
    });

    Promise.all(data).then((values) => {
      this.setState({ data: values });
      this.setState({ isRefreshInProgress: false });
      this.setState({ message: `Total Records found : ${this.state.data.length}` });
      this.generateTable();
    });
  };

  refreshRepository = async () => {
    this.setState({ message: "Refreshing..." });
    this.setState({ isRefreshInProgress: true });
    try {
      aws.config.setPromisesDependency();
      aws.config.update({
        accessKeyId: "AKIAQRR6IDLUWF6BNZEJ",
        secretAccessKey: "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",
        region: "us-east-1",
      });

      const s3 = new aws.S3();
      const response = await s3
        .listObjectsV2({
          Bucket: this.state.bucketName,
        })
        .promise();

      this.processData(response.Contents);
    } catch (e) {
      console.log("our error", e);

      //Simulation code
      var data = [
        {
          Key: "input/",
          LastModified: "Thu Dec 16 2021",
          Size: 0,
        },
        {
          Key: "input/Sample3Sim.csv",
          LastModified: "Thu Dec 17 2021",
          Size: 50,
        },
        {
          Key: "input/test2Sim.txt",
          LastModified: "Thu Dec 18 2021",
          Size: 40,
        },
      ];
      this.processData(data);
    }
  };

  showImportOption = () => {
    this.setState({
      showImportOption: true,
    });
  };

  uploadFile = () => {
    var _self = this;

    if (this.state.selectedFile == undefined) {
      return;
    }

    this.setState({ message: "Uploading File..." });
    this.setState({ isUploadingInProgress: true });

    const formData = new FormData();
    formData.append("demo file", this.state.selectedFile, this.state.selectedFile.name);

    axios
      .post("https://qzcrf0o2oi.execute-api.us-east-1.amazonaws.com/prod/file-upload", formData)
      .then((response) => {
        document.querySelector("#importFile").value = "";
        _self.setState({
          showImportOption: false,
          selectedFile: undefined,
        });
        this.setState({ message: "Uploaded Sucessfully" });
        this.setState({ isUploadingInProgress: false });
        this.refreshRepository();
      })
      .catch((error) => {
        this.setState({ isUploadingInProgress: false });
        this.refreshRepository();
      });
  };

  render() {
    return (
      <div className="root-container">
        <div className="repository-header">
          <div className="repository-message">{this.state.message}</div>
          <div className={this.getRepositoryActionButtonClass()}>
            <div className="button button-1" onClick={this.showImportOption}>
              Upload
            </div>
            <div className="button button-2" onClick={this.refreshRepository}>
              Refresh
            </div>
          </div>
        </div>
        <div className={this.getImportOptionClass()}>
          <input type="file" id="importFile" name="avatar" accept=".csv" className="visibility-hide"></input>
          <div className={this.getChooseFileButtonClass()}>
            <div className="action-buttons">
              <div className="button button-1" onClick={this.chooseFile}>
                Choose File
              </div>
              <div className="button button-2" onClick={this.cancelchooseFile}>
                Cancel
              </div>
            </div>
          </div>
          <div className={this.getUploadFileButtonClass()}>
            <div className="file-name-message">{this.getFileName()}</div>
            <div className="action-buttons">
              <div className="button button-1" onClick={this.uploadFile}>
                Upload File
              </div>
              <div className="button button-2" onClick={this.cancelImportFile}>
                Cancel
              </div>
            </div>
          </div>
        </div>
        <div className={this.getRepositoryContainerClass()}>
          <table id="repository-table" className="repository-table"></table>
        </div>
      </div>
    );
  }
}

export default RepositoryPage;
