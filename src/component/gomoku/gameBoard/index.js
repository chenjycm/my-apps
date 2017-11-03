import React, { Component } from "react";

import './index.scss';

class GameBoard extends Component {
    constructor(){
        super();
        this.state = {
            boardWidth: 644,
            cubeWidth: 46,
            steps: [],
            stepCount : 0,
            bTurn: true,  //该black下
        }
    }
    componentDidMount(){
        this.getBoardLine();
    }
    getBoardLine = () => {
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
        const{ cubeWidth, stepCount ,steps} = this.state;
        const c = this.refs.gameBoard;
        let stepCoor = [];
        let posX = e.pageX - c.getBoundingClientRect().left - 12,
            posY = e.pageY - c.getBoundingClientRect().top - 12;
        console.log(posX,posY);
        this.formulatPos(posX, posY);
        let x = Math.round(posX/cubeWidth), y = Math.round(posY/cubeWidth);
        stepCoor.push([x,y]);       
        console.log(stepCoor)
        let ctx = c.getContext('2d');
        ctx.beginPath();
        ctx.arc(x*cubeWidth, y*cubeWidth, 18, 0, Math.PI*2,true);
        ctx.closePath();
        ctx.fill();
        this.setState({
            stepCount: stepCount + 1
        })
    }
    formulatPos = (a, b) => {
        
    }
    render() {
        const {stepCount} = this.state;
        return (
            <div>
                <canvas ref="gameBoard" id="gameBoard" onClick={this.setChess} ></canvas>
                <div>
                    <span>steps:</span>
                    {stepCount}
                </div>
            </div>
        )
    }
}

export default GameBoard;