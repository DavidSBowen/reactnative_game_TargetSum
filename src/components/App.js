import React from 'react';

import Game from './Game';
import Start from './Start';

class App extends React.Component {

    state = {
        randomNumberCount: 6,
        initialSeconds: 10,
        key: 0,
        gameStarted: false,
        consecutiveWins: 0,
    }

    startGame = () => {
        this.setState({
            gameStarted: true,
        });
    }

    resetGame = () => {
        this.setState((prevState) => {
            return {
                key: prevState.key + 1,
            };
        });
    }

    backToTitle = () => {
        this.setState({
            gameStarted: false,
            consecutiveWins: 0,
        });
    }

    incrementGameWinCount = () => {
        this.setState((prevState) => {
            return { consecutiveWins: prevState.consecutiveWins + 1 };
        });
    }
    resetGameWinCount = () => {
        this.setState({ consecutiveWins: 0 });
    }

    render() {
        return (
            this.state.gameStarted ?
                <Game
                    randomNumberCount={this.state.randomNumberCount}
                    initialSeconds={this.state.initialSeconds}
                    resetGame={this.resetGame}
                    key={this.state.key}
                    backToTitle={this.backToTitle}
                    consecutiveWins={this.state.consecutiveWins}
                    incrementGameWinCount={this.incrementGameWinCount}
                    resetGameWinCount={this.resetGameWinCount} /> :
                <Start
                    startGame={this.startGame}
                />

        );
    }
}


export default App;