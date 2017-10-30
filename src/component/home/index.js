import React, { Component } from "react";
import { Link, IndexLink } from "react-router";
import logo from "../../logo.svg";
import "./home.scss";
import avartar from '../../images/avatar.jpg';
class Home extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">                   
                    <div className="navigation">
                        <ul>
                            <li>
                                <IndexLink to="/" activeClassName="navActive">
                                    Home
                                </IndexLink>
                            </li>
                            <li>
                                <Link to="/music" activeClassName="navActive">
                                    Music
                                </Link>
                            </li>
                            <li>
                                <Link to="/page3" activeClassName="navActive">
                                    Page3 
                                </Link>
                            </li>
                            <img src={logo} className="App-logo" alt="logo" />
                        </ul>
                    </div>
                    <div className="userBox"><img className="avartar" src={avartar}/><span className="name">沉末</span></div>
                </header>
                <div className="content">
                    {
                        this.props.children
                    }
                </div>
            </div>
        );
    }
}

export default Home;
