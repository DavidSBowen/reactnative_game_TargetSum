import React from 'react';

import Game from './Game';
import Start from './Start';

class App extends React.Component {

    state = {
        randomNumberCount: 6,
        initialSeconds: 10,
        key: 0,
        gameStarted: true,
    }

    startGame = () => {
        this.setState({
            gameStarted: true,
        });
    }

    resetGame = () => {
        this.setState({ key: this.state.key + 1 });
    }

    backToTitle = () => {
        this.setState({
            gameStarted: false,
        });
    }

    render() {
        return (
            this.state.gameStarted ?
                <Game
                    randomNumberCount={this.state.randomNumberCount}
                    initialSeconds={this.state.initialSeconds}
                    resetGame={this.resetGame}
                    key={this.state.key}
                    backToTitle={this.backToTitle} /> :
                <Start
                    startGame={this.startGame}
                />

        );
    }
}


export default App;