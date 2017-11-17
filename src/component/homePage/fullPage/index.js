import React, { Component } from "react";
import "./index.scss";
class FullPage extends Component {
    constructor(){
        super();
        this.state = {
            itemHeight: '',
            itemWidth: '',
            position: 0,
        }
    }
    componentDidMount(){
        window.onresize = function(){
            this.throttle(this.setItemList)
        }.bind(this);
        // document.querySelector('.fullPageBox').onmousewheel = (e)=>{
        //     this.wheel = e;
        //     this.throttle(this.handleWheel);
        // }  //改用react的onWheel兼容IE
        this.setState({
            itemHeight: document.querySelector('.fullPageBox').offsetHeight,
            itemWidth: document.querySelector('.fullPageBox').offsetWidth
        });
        this.props.autoplay && this.autoplay();        
    }

    //节流函数
    throttle = (method,context) => {
        clearTimeout(method.tId);
        method.tId = setTimeout(function(){
            method.call(context)
        },200)
    }

    //自动播放
    autoplay = () => {
        const {children, during} = this.props;
        const len = children.length;
        const time =  during || 2000;
        let play = setInterval(()=>{
            const { position } = this.state;
            if(position < len - 1){
                this.setState({
                    position: position + 1
                })
            }else{
                this.setState({
                    position: 0
                })
            }
        },time);
    }
    
    //设置每页的宽和高
    setItemList = () => {
        const height = document.querySelector('.fullPageBox').offsetHeight;
        const width = document.querySelector('.fullPageBox').offsetWidth;
        this.setState({
            itemHeight: height,
            itemWidth: width
        })
    }

    onWheel = (e) => {
        this.wheel = e.deltaY;
        this.throttle(this.handleWheel);
    }
    handleWheel = (wheel = this.wheel) => {
        let delta = wheel;
        const { position } = this.state;
        const { children } = this.props;
        if(delta > 0 && position >= 0 && position < children.length - 1 ){
            this.setState({
                position: position + 1
            })
        }else if(delta < 0 && position > 0 && position < children.length ){
            this.setState({
                position: position - 1
            })
        }
    }

    //点击翻页
    changePage = (i) => {
        this.setState({
            position: i
        })
    }

    //生成点点
    getPointer = () => {
        const { position } = this.state;
        const { children, type } = this.props;
        if(children && children.length > 0){
            let pointers = [];        
            for(let i = 0; i < children.length; i++){                
                pointers.push(<span key={i} 
                    onClick={this.changePage.bind(this,i)} 
                    className={`pointItem ${position == i ? 'active' : ''}`}>
                        </span>)             
            };
            return pointers
        }

    }
    render() {
        const { itemHeight, itemWidth, position } = this.state;
        const { children, color, type } = this.props;
        const style = type == 'vertical' ? {   //垂直情况
            listStyle: {top: `-${itemHeight * position}px`, width: '100%', height: `${itemHeight * children.length}px`, transition: 'top .5s ease'},
            pointStyle: {top: `calc(50% - ${children.length * 18/2}px)`}
        }:{                                 //水平情况
            listStyle: {left: `-${itemWidth * position}px`, height: '100%', width: `${itemWidth * children.length}px`, transition: 'left .5s ease'},
            pointStyle: {top: '90%', left: `calc(50% - ${children.length * 22/2}px)`}
        }
            return (
            <div className="fullPageBox" onWheel={this.onWheel}> 
                <div className='pageList' style={style.listStyle}>
                {
                    children && children.length > 0 && children.map((item,idx)=>{
                        const itemStyle = type == 'vertical' ? {
                            height:  `${itemHeight}px`,
                            background: color[idx]     
                        } : {
                            width:  `${itemWidth}px`,
                            background: color[idx]  
                        };
                        return (
                            <div className={`${type == 'vertical' ? 'pageItemVertical' : 'pageItemhorizontal'} ${position == idx ? 'active' : ''}`}  style={itemStyle} key={idx} pageid={idx}>
                                {
                                    item
                                }
                            </div>
                        )
                    })
                }
                </div>
                <div className={`pointer ${type == 'vertical' ? 'vertical' : 'horizontal'}`} style={style.pointStyle}>
                  {
                      this.getPointer()
                  }
                </div>
            </div>
        );
    }
}

export default FullPage;
