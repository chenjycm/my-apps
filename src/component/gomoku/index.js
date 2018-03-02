import React, { Component } from "react";

import GameBoard from './gameBoard';

import './index.scss';

class Gomoku extends Component {
    render() {
        return (
            <div className="page3">
                <h2>Gomoku</h2>
                <GameBoard />
                <div className="appInfo">
                    <div className="gitAddress"><span>Code: https://github.com/chenjycm/my-apps/tree/master/src/component/gomoku</span></div>
                </div> 
            </div>
        );
    }
}

export default Gomoku;