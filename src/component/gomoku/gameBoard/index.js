import React, { Component } from "react";
import _ from 'lodash';
import {Button, message} from 'antd';
import './index.scss';

class GameBoard extends Component {
    constructor(){
        super();
        this.state = {
            boardWidth: 680,
            cubeWidth: 640 / 14,           
            trans: 20,
            steps: [],
            stepCount : 0,
            blackTurn: true,  //该black下
            playing: true,
            winner: '',
        }
    }
    componentDidMount(){
        this.c = this.refs.gameBoard;
        this.ctx = this.c.getContext('2d');
        this.getBoardLine();
    }
   
    getBoardLine = () => {   //绘制游戏面板
        const {boardWidth, cubeWidth, trans} = this.state; //面板宽度 和 格子宽度
        this.c.width = boardWidth;
        this.c.height = boardWidth;
        let ctx = this.ctx;
        ctx.translate(trans,trans)
        for(let i = 0 ; i < 15;  i++){
            ctx.moveTo(0, i*cubeWidth);
            ctx.lineTo(boardWidth - trans*2, i*cubeWidth);
            ctx.moveTo(i*cubeWidth, 0);
            ctx.lineTo(i*cubeWidth, boardWidth - trans*2);           
        }
        ctx.lineWidth = 1; 
        ctx.stroke();
        let s = 3*cubeWidth, m = cubeWidth*7, b = 11*cubeWidth;
        let point = [[s, s], [b, s], [m, m], [s, b], [b,b]]
        for(let k in point){
            ctx.beginPath();
            ctx.arc(point[k][0], point[k][1], 4, 0, Math.PI*2,true);
            ctx.closePath();
            ctx.fill();
        }       
    }
    setChess = (e) => {
        const{ cubeWidth, blackTurn, steps,playing} = this.state;
        if(playing){
            let c = this.c;
            let ctx = this.ctx;
            let stepCoor = {};
            //点击位置距离浏览器边的距离 - 容器距离浏览器边的距离 - 边框厚度           
            let posX = e.pageX - c.offsetLeft - 34,   
                posY = e.pageY - c.offsetTop - 34;
            if((posX%cubeWidth > 28 || posX%cubeWidth < 17) && (posY%cubeWidth > 28 || posY%cubeWidth < 17)){
                let x = Math.round(posX/cubeWidth), y = Math.round(posY/cubeWidth);
                stepCoor.x = x;
                stepCoor.y = y;
                stepCoor.t = `${blackTurn ? 'black' : 'white'}`;
                if(_.filter(steps, {'x':x, 'y':y}).length < 1){
                    ctx.shadowOffsetX = 2; // 阴影Y轴偏移
                    ctx.shadowOffsetY = 2; // 阴影X轴偏移
                    ctx.shadowBlur = 8; // 模糊尺寸
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // 颜色     
                    ctx.beginPath();
                    let grad  = ctx.createRadialGradient(x*cubeWidth, y*cubeWidth,18,x*cubeWidth -4 ,y*cubeWidth -4,2);                                      
                    ctx.arc(x*cubeWidth, y*cubeWidth, 18, 0, Math.PI*2,true);  
                    if(blackTurn){                  
                        grad.addColorStop(0,'#000');
                        grad.addColorStop(0.5,'#4a4a4a'); 
                        grad.addColorStop(1,'#ababab');
                    }else{
                        grad.addColorStop(0,'#e2e2e2');
                        grad.addColorStop(0.5,'#efefef'); 
                        grad.addColorStop(1,'#fff');
                    }
                    ctx.fillStyle = grad;
                    ctx.closePath();
                    ctx.fill();   
                    ctx.save();   
                    this.winGame(steps, stepCoor, blackTurn);
                            
                }else{
                    message.error('不能在这里下棋',1);
                }   
            } 
        }
    }
    winGame = (AllSteps,stepCoor) => {
        const { stepCount, blackTurn, steps} = this.state;
        const type = `${blackTurn ? 'black' : 'white'}`;
        let x = stepCoor.x , y = stepCoor.y;
        let newSteps = _.concat(steps, stepCoor);
        let arr = [0,0,0,0]; //4个方向的数量统计分别是|，——，/，\       
        let direction = [[0,-1,0],[0,1,0],[-1,0,1],[1,0,1],[1,-1,2],[-1,1,2],[-1,-1,3],[1,1,3]]  //拆分为8个方向的查找
        let test = (AllSteps,step,dir) =>{   //根据方向进行查找
            let findPoint = {'x':step.x+dir[0],'y':step.y+dir[1]}
            let find = _.filter(AllSteps, findPoint);
            if( !find || find.length === 0 || find[0].t !== type){
                return;
            }else if(find[0].t === type){
                arr[dir[2]]++;               
                test(AllSteps,{'x':find[0].x,'y':find[0].y},dir);
            }
        }
        for(let i = 0; i < direction.length; i++){
            test(AllSteps,{'x':x,'y':y},direction[i]);
        }
        if(arr[0] >= 4 || arr[1] >= 4 || arr[2] >= 4 || arr[3] >= 4){        
            this.setState({
                stepCount: stepCount + 1 ,
                steps: newSteps,
                winner: type,
                playing: false,
            })
            type && message.success(type+'获胜！',2);
        }else{
            this.setState({
                stepCount: stepCount + 1 ,
                blackTurn: !blackTurn,
                steps: newSteps
            })    
        }
    }
    
    clearAll = () => {
        let c = this.c;
        this.ctx.clearRect(0,0,c.width,c.height);  
        this.componentDidMount();
        this.setState({
            steps: [],
            stepCount : 0,
            blackTurn: true,  //该black下
            playing: true,
            winner: '',
        })
    }
    turnBack = () => {
        console.log('back');
        let {steps, cubeWidth} = this.state;
        if(steps && steps.length > 0){
            let delItem = steps.pop();
            // const c = this.refs.gameBoard;
            // let ctx = c.getContext('2d'); 
            this.ctx.restore();     
            // ctx.clearRect(cubeWidth*delItem.x-10, cubeWidth*delItem.y-10, 18,18)  
        }
    }
    render() {
        const {stepCount, blackTurn, winner} = this.state;
        return (
            <div>
                <div className="btns">
                    <Button onClick={this.clearAll}>重置</Button>
                    <Button className="turnBack" onClick={this.turnBack}>悔棋</Button>
                    <div className="turnTag">
                        <span className="title">本轮：</span>
                        <span className={`items ${blackTurn ? 'black' : 'white'}`}></span>
                        <span className="winner">{`${winner ? winner+'获胜' : ''}`}</span>    
                    </div>
                    
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