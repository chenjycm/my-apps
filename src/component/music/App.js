import React, { Component } from 'react';
import MusicBox from './MusicBox';
import './App.scss';             //页面css
import 'antd/dist/antd.css';   //引入antd样式
// import playimg from '../images/play.png';

class MusicApp extends Component {    //将播放器放入APP，在由app放入index
    
    componentDidMount(){
        console.log()
    }
    render() {
    return (
      <div className="musicApp">      
        <MusicBox />
        <div className="appInfo">
          <div className="gitAddress"><span>Code: https://github.com/chenjycm/my-music</span></div>
        </div>   
      </div>
    );
  }
}

export default MusicApp;