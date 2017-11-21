import React, { Component } from "react";
import { Switch, InputNumber } from 'antd';
import FullPage from "./fullPage";
import "./index.scss";


class HomePage extends Component {
    constructor(){
        super();
        this.state = {
            horizontal: false,
            autoplay: false,
            during: '3000',
            showDot: true
        }
    }

    handleChange = () => {
        this.setState({
            horizontal: !this.state.horizontal
        })
    }
    handleAuto = () => {
        this.setState({
            autoplay: !this.state.autoplay
        })
    }
    onDuringChange = (value) => {
        this.setState({
            during: value
        })
    }
    render() {
        const { horizontal, autoplay, during } = this.state;
        // console.log(autoplay);
        
// const color = ['#2893A2', '#FCA180', '#ABCB89', '#71BAF3']
// horizontal   vertical
// autoplay={true}
// during={3000}
        return (
            <div className="homePage">
                <Switch className="typeSwitch" onChange={this.handleChange} checkedChildren="横屏" unCheckedChildren="竖屏" />
                <Switch className="autoSwitch" onChange={this.handleAuto} checkedChildren="自动" unCheckedChildren="手动" /> 
                {
                    autoplay &&  <InputNumber className="duringInput" 
                        step={500}
                        min={1000} 
                        max={20000} 
                        defaultValue={during} 
                        onChange={this.onDuringChange} />
                }
                <FullPage
                    color={["#2893A2", "#FCA180", "#ABCB89", "#71BAF3"]}
                    type={`${horizontal ? 'horizontal' : 'vertical'}`}
                    autoplay={autoplay}
                    during={during}
                >
                    <div className="pages">11111</div>
                    <div className="pages">22222</div>
                    <div className="pages">33333</div>
                    <div className="pages">44444</div>
                </FullPage>
            </div>
        );
    }
}

export default HomePage;
