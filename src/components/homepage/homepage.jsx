import React, { Component } from 'react';

import '../../Global.css';
import Card from '../card/card';

class HomePage extends React.Component {

  render() { 
    return (
      <div className="home-page-card-wrapper">
        <Card header="Data Specification"
          content="Displays the specifications of the SN74LS_Rev01 Product"
          icon="specification.svg"
          onClick={this.props.openSpecification}></Card>
        <Card header="Data Repository"
          content="Store, Archive and Share measurement data within/across disciplines"
          icon="repository.svg"
          onClick={this.props.openRepository}></Card>
        <Card header="Data Plugin"
          content="Displays the plugin source code which converts the csv data into parquet format"
          icon="plugin.svg"
          onClick={this.props.openPlugin}></Card>
        <Card header="Spec Compliance Report"
          content="Displays the compliance of the SN74LS_Rev01 Product"
          icon="compliance.svg"
          onClick={this.props.openCompliance}></Card>
        <Card header="Data Playgrounds"
          content="Convert Data to Insights"
          icon="insight.svg"
          onClick={this.props.openPlayground}></Card>
      </div>
    )
  }
}
 
export default HomePage;