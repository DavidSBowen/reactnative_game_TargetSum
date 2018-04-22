import React from 'react';

import Game from './Game';

class App extends React.Component {

    state = {
        randomNumberCount: 6,
        initialSeconds: 10,
        key: 0,
    }

    resetGame = () => {
        this.setState({key: this.state.key + 1});
    }

    render() {
        return (
            <Game
                randomNumberCount={this.state.randomNumberCount}
                initialSeconds={this.state.initialSeconds}
                resetGame={this.resetGame}
                key={this.state.key} />
        );
    }
}

export default App;