import React, { Component } from "react";
import _ from 'lodash';
import {Button, message} from 'antd';
import './index.scss';


class GameBoard extends Component {
    constructor(){
        super();
        this.state = {
            boardWidth: 644,
            cubeWidth: 46,
            steps: [],
            stepCount : 0,
            blackTurn: true,  //该black下
        }
    }
    componentDidMount(){
        this.getBoardLine();
    }
    componentWillMount(){
        const {cubeWidth, steps} = this.setState;
        console.log(steps);
        
    }
    getBoardLine = () => {   //绘制游戏面板
        const {boardWidth, cubeWidth} = this.state; //面板宽度 和 格子宽度
        const c = this.refs.gameBoard;
        c.width = boardWidth;
        c.height = boardWidth;
        let ctx = c.getContext('2d');
        for(let i = 0 ; i < 15;  i++){
            ctx.moveTo(0, i*cubeWidth);
            ctx.lineTo(boardWidth, i*cubeWidth);
            ctx.moveTo(i*cubeWidth, 0);
            ctx.lineTo(i*cubeWidth, boardWidth);           
        }
        ctx.lineWidth = 1; 
        ctx.stroke();
        let s = 3*cubeWidth, m = boardWidth/2, b = 11*cubeWidth;
        let point = [[s, s], [b, s], [m, m], [s, b], [b,b]]
        for(let k in point){
            ctx.beginPath();
            ctx.arc(point[k][0], point[k][1], 4, 0, Math.PI*2,true);
            ctx.closePath();
            ctx.fill();
        }
    }
    setChess = (e) => {
        const{ cubeWidth, stepCount ,blackTurn, steps} = this.state;
        const c = this.refs.gameBoard;
        let stepCoor = {};
        let posX = e.pageX - c.getBoundingClientRect().left - 12,   //点击位置距离浏览器边的距离 - 容器距离浏览器边的距离 - 边框厚度
            posY = e.pageY - c.getBoundingClientRect().top - 12;
        this.formulatPos(posX, posY);
        let x = Math.round(posX/cubeWidth), y = Math.round(posY/cubeWidth);
        stepCoor.x = x;
        stepCoor.y = y;
        stepCoor.t = `${blackTurn ? 'black' : 'white'}`;
        if(x!== 0 && x!== 14 && y!== 0 && y!== 14 &&_.filter(steps, {'x':x, 'y':y}).length < 1){
            let ctx = c.getContext('2d');
            ctx.shadowOffsetX = 2; // 阴影Y轴偏移
            ctx.shadowOffsetY = 2; // 阴影X轴偏移
            ctx.shadowBlur = 8; // 模糊尺寸
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // 颜色     
            ctx.beginPath();
            ctx.arc(x*cubeWidth, y*cubeWidth, 18, 0, Math.PI*2,true);
            ctx.closePath();
            if(blackTurn){
                ctx.fillStyle="#000000";
            }else{
                ctx.fillStyle="#ffffff";
            }
            ctx.fill();
            let newSteps = _.concat(steps, stepCoor);
            this.setState({
                stepCount: stepCount + 1 ,
                blackTurn: !blackTurn,
                steps: newSteps
            })
        }else{
            message.error('不能在这里下棋');
        }   
        
        
    }
    formulatPos = (a, b) => {
        
    }
    render() {
        const {stepCount, blackTurn} = this.state;
        return (
            <div>
                <div className="btns">
                    <Button>重置</Button>
                    <div className="turnTag"><span className="title">本轮：</span><span className={`items ${blackTurn ? 'black' : 'white'}`}></span></div>
                    <Button>悔棋</Button>
                    
                </div>
                <canvas ref="gameBoard" id="gameBoard" onClick={this.setChess} ></canvas>
                <div>
                    <span>steps - </span>
                    {stepCount}
                </div>
            </div>
        )
    }
}

export default GameBoard;