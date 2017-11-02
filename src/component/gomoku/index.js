import React, { Component } from "react";

import GameBoard from './gameBoard';

import './index.scss';

class Gomoku extends Component {
    render() {
        return (
            <div className="page3">
                <h2>Gomoku: 五子棋</h2>
                <GameBoard />
            </div>
        );
    }
}

export default Gomoku;