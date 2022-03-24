import React, { Component } from "react";

import "./mainpage.css";
import "../../Global.css";
import HomePage from "../homepage/homepage";
import RepositoryPage from "../repositorypage/repositorypage";
import PlayGroundPage from "../playgroundpage/playgroundpage";

class MainPage extends React.Component {
  state = {
    currentPage: "Home",
  };

  openCompliance = () => {
    this.setState({ currentPage: "Compliance" });
  };

  openHome = () => {
    this.setState({ currentPage: "Home" });
  };

  openPlayground = () => {
    this.setState({ currentPage: "Playground" });
  };

  openPlugin = () => {
    this.setState({ currentPage: "Plugin" });
  };

  openRepository = () => {
    this.setState({ currentPage: "Repository" });
  };

  openSpecification = () => {
    this.setState({ currentPage: "Specification" });
  };

  isComplianceMenuSelected = () => {
    return this.state.currentPage == "Compliance" ? "menu-element selected" : "menu-element";
  };

  isHomeMenuSelected = () => {
    return this.state.currentPage == "Home" ? "menu-element selected" : "menu-element";
  };

  isPlaygroundMenuSelected = () => {
    return this.state.currentPage == "Playground" ? "menu-element selected" : "menu-element";
  };

  isPluginMenuSelected = () => {
    return this.state.currentPage == "Plugin" ? "menu-element selected" : "menu-element";
  };

  isRepositoryMenuSelected = () => {
    return this.state.currentPage == "Repository" ? "menu-element selected" : "menu-element";
  };

  isSpecificationMenuSelected = () => {
    return this.state.currentPage == "Specification" ? "menu-element selected" : "menu-element";
  };

  isCompliancePageVisible = () => {
    return this.state.currentPage == "Compliance" ? "cntr" : "hide";
  };

  isHomePageVisible = () => {
    return this.state.currentPage == "Home" ? "" : "hide";
  };

  isPlaygroundPageVisible = () => {
    return this.state.currentPage == "Playground" ? "cntr" : "hide";
  };

  isPluginPageVisible = () => {
    return this.state.currentPage == "Plugin" ? "" : "hide";
  };

  isRepositoryPageVisible = () => {
    return this.state.currentPage == "Repository" ? "cntr" : "hide";
  };

  isSpecificationPageVisible = () => {
    return this.state.currentPage == "Specification" ? "cntr" : "hide";
  };

  render() {
    return (
      <div className="main-page">
        <div className="menu-container">
          <div className="menu-header">
            <div className="menu-header-1">CUBO</div>
            <div className="menu-header-2">Analytics</div>
          </div>
          <div className="menu-content" onClick={this.openHome}>
            <div className={this.isHomeMenuSelected()}>
              <img className="menu-icon" src={require(`../../assets/home.svg`).default} />
              <div className="menu-label">Home</div>
            </div>
          </div>
          <div className="menu-content" onClick={this.openSpecification}>
            <div className={this.isSpecificationMenuSelected()}>
              <img className="menu-icon" src={require(`../../assets/specification.svg`).default} />
              <div className="menu-label">Data Specification</div>
            </div>
          </div>
          <div className="menu-content" onClick={this.openRepository}>
            <div className={this.isRepositoryMenuSelected()}>
              <img className="menu-icon" src={require(`../../assets/repository.svg`).default} />
              <div className="menu-label">Data Repositories</div>
            </div>
          </div>
          <div className="menu-content" onClick={this.openPlugin}>
            <div className={this.isPluginMenuSelected()}>
              <img className="menu-icon" src={require(`../../assets/plugin.svg`).default} />
              <div className="menu-label">Data Plugin</div>
            </div>
          </div>
          <div className="menu-content" onClick={this.openCompliance}>
            <div className={this.isComplianceMenuSelected()}>
              <img className="menu-icon" src={require(`../../assets/compliance.svg`).default} />
              <div className="menu-label">Data Compliance</div>
            </div>
          </div>
          <div className="menu-content" onClick={this.openPlayground}>
            <div className={this.isPlaygroundMenuSelected()}>
              <img className="menu-icon" src={require(`../../assets/insight.svg`).default} />
              <div className="menu-label">Data Playgrounds</div>
            </div>
          </div>
        </div>
        <div className="content-page">
          <div className="content-page-header">
            <div className="content-page-header-lft">
              <div className="header-1">Workspace</div>
              <div className="header-2">ADC1234</div>
            </div>
            <div className="content-page-header-right">
              <div className="progress-bar"></div>
              <div className="header-3">900 GB Free of 900 GB</div>
            </div>
          </div>
          <div className="content-page-content">
            <div className={this.isCompliancePageVisible()}>
              <iframe src="https://specmanagement.io/scm/product/T101#compliance-view" height="100%" width="100%"></iframe>
            </div>
            <div className={this.isHomePageVisible()}>
              <HomePage openCompliance={this.openCompliance} openPlayground={this.openPlayground} openPlugin={this.openPlugin} openRepository={this.openRepository} openSpecification={this.openSpecification} />
            </div>
            <div className={this.isPlaygroundPageVisible()}>
              <PlayGroundPage></PlayGroundPage>
            </div>
            <div className={this.isPluginPageVisible()}>Plugin</div>
            <div className={this.isRepositoryPageVisible()}>
              <RepositoryPage></RepositoryPage>
            </div>
            <div className={this.isSpecificationPageVisible()}>
              <iframe src="https://specmanagement.io/scm/product/T101#spec-view" height="100%" width="100%"></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
