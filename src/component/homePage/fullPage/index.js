import React, { Component } from "react";
import "./index.scss";
class FullPage extends Component {
    constructor(){
        super();
        this.state = {
            itemHeight: '',
            itemWidth: '',
            position: 0,
            autoplay: false,
            during: '3000'
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
            autoplay: this.props.autoplay,
            during: this.props.during
        })
        this.setItemList();        
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            autoplay: nextProps.autoplay,
            during: nextProps.during
        })
    }
    componentWillMount(){
        this.autoplay();
    }
    //节流函数
    throttle = (method,context) => {
        clearTimeout(method.tId);
        method.tId = setTimeout(function(){
            method.call(context)
        },200)
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
        this.changePage(delta);
    }
    //滚动或滑动时页面改变，a表示增或减，>0增 <0减
    changePage = (a) => {
        const { position } = this.state;
        const { children } = this.props;
        if(a > 0 && position >= 0 && position < children.length - 1 ){
            this.setState({
                position: position + 1
            })
        }else if(a < 0 && position > 0 && position < children.length ){
            this.setState({
                position: position - 1
            })
        }
    }
    //点击跳转到页面
    clickChangePage = (i) => {
        this.setState({
            position: i
        })
    }
    //生成点点
    getPointer = () => {
        const { position } = this.state;
        const { children } = this.props;
        if(children && children.length > 0){
            let pointers = [];        
            for(let i = 0; i < children.length; i++){                
                pointers.push(<span key={i} 
                    onClick={this.clickChangePage.bind(this,i)} 
                    className={`pointItem ${position == i ? 'active' : ''}`}>
                        </span>)             
            };
            return pointers
        }

    }
    //触屏滑动动作
    handleTouchStart = (e) => {
        // e.persist();
        const { type } = this.props;
        this.startPoint = type == 'vertical' ? e.touches[0].pageY : e.touches[0].pageX;
    }
    handleTouchEnd = (e) => {
        const { type } = this.props;        
        // e.persist();  
        let start = this.startPoint;
        let end = type == 'vertical' ? e.changedTouches[0].pageY : e.changedTouches[0].pageX;
        let delta = start - end;
        let a = 0;
        if(delta > 10){
            a = 1;
        }else if(delta < -10){
            a = -1;
        }
        this.changePage(a);       
    }
    handleTouchMove = (e) => {
        // e.persist();
        // console.log(e.changedTouches[0].pageY)        
    }
    //自动播放
    autoplay = () => {
        const {children } = this.props;
        const { autoplay, during } = this.state;
        const len = children.length;
        const time =  during || 3000;
        if(autoplay){
            this.play && window.clearInterval(this.play);
            this.play = '';
            this.play = setInterval(()=>{
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
        }else{
            this.play && window.clearInterval(this.play);
            this.play = '';
        }
    }
    render() {
        const { itemHeight, itemWidth, position } = this.state;
        const { children, color, type } = this.props;  
        this.autoplay();
        const style = type == 'vertical' ? {   //垂直情况
            listStyle: {
                transform: `translate3d(0,-${itemHeight * position}px,0)`, 
                width: '100%', 
                height: `${itemHeight * children.length}px`, 
                transition: 'transform .5s ease'
            },
            pointStyle: {top: `calc(50% - ${children.length * 18/2}px)`}
        }:{                                 //水平情况
            listStyle: {
                transform: `translate3d(-${itemWidth * position}px,0,0)`, 
                height: '100%', 
                width: `${itemWidth * children.length}px`, 
                transition: 'transform .5s ease'},
            pointStyle: {top: '90%', left: `calc(50% - ${children.length * 22/2}px)`}
        }
            return (
            <div className="fullPageBox" 
                onWheel={this.onWheel} 
                onTouchStart={this.handleTouchStart} 
                onTouchEnd={this.handleTouchEnd}
                onTouchMove={this.handleTouchMove}
            > 
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
