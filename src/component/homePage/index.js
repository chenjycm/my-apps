import React, { Component } from "react";
import FullPage from './fullPage';
import "./index.scss";

// const color = ['#2893A2', '#FCA180', '#ABCB89', '#71BAF3']
// horizontal   vertical
// autoplay={true}
// during={3000}


class HomePage extends Component {
    render() {
        return (
            <div className="homePage">
               <FullPage 
                    color={['#2893A2', '#FCA180', '#ABCB89', '#71BAF3']}
                    type='vertical'
                >
                   <div className='pages'>11111</div>
                   <div className='pages'>22222</div>
                   <div className='pages'>33333</div>
                   <div className='pages'>44444</div>
               </FullPage>
            </div>
        );
    }
}

export default HomePage;
