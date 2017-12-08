import React, { Component } from "react";
import { Link, IndexLink } from "react-router";
import { Icon, Popover  } from 'antd';
import logo from "../../logo.svg";
import "./home.scss";
import avartar from '../../images/avatar.jpg';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            visible: false,
            appName: 'Home',
        }
    }
    componentWillMount(){
        // console.log(this.state.visible)
    }    
    hide = () => {
        this.setState({
            visible: false,
        });
    }
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    }
    setAppName = (appName) => {
        this.setState({
            appName
        })
    }
    navList = (show = false) => {
        return (
            <ul>
                <li>
                    <IndexLink to="/"  onClick={this.setAppName.bind(this,'Home')}  activeClassName="navActive">
                        Home
                    </IndexLink>
                </li>
                <li>
                    <Link to="/music" onClick={this.setAppName.bind(this,'Music')} activeClassName="navActive">
                        Music
                    </Link>
                </li>
                <li>
                    <Link to="/gomoku" onClick={this.setAppName.bind(this,'Gomoku')} activeClassName="navActive">
                        Gomoku 
                    </Link>
                </li>
                <li>
                    <Link to="/solarsys" onClick={this.setAppName.bind(this,'Solarsys')} activeClassName="navActive">
                        Solarsys 
                    </Link>
                </li>
                {
                    show ? <li className="mobileShowName">
                                <a>
                                    {this.state.appName} 
                                </a>
                            </li>
                    : ''
                }
            </ul>
        )
    }
    navContent = () => {
        return (
            <div className="mobileNavigation" onClick={this.hide}>
               {this.navList(false)}
            </div>
        )
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">                   
                    <div className="navigation">
                        {
                            this.navList(true)
                        }
                        <Popover                             
                            placement="bottom" 
                            title={'AppStore'} 
                            content={this.navContent()} 
                            trigger="click"
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}
                        >
                            <Icon type="appstore-o" className="appStore"/>
                        </Popover>
                        <img src={logo} className="App-logo" alt="logo" />
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
