import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

import RandomNumber from './RandomNumber';
import Timer from './Timer';

class Game extends React.Component {

    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        resetGame: PropTypes.func.isRequired,
        backToTitle: PropTypes.func.isRequired,
        consecutiveWins: PropTypes.number.isRequired,
        incrementGameWinCount: PropTypes.func.isRequired,
        resetGameWinCount: PropTypes.func.isRequired,
    };

    state = {
        selectedNumbers: [],
        gameStatus: 'PLAYING',
        remainingSeconds: this.props.initialSeconds,
        gameSeconds: this.props.initialSeconds,
    };

    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => {
            return (1 + Math.floor(10 * Math.random()));
        });

    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, cur) => {
            return acc + cur;
        }, 0);

    shuffle = (array) => {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    shuffledNumbers = this.shuffle(this.randomNumbers);

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => {
                return { remainingSeconds: (prevState.remainingSeconds - 1) };
            }, () => {
                if (this.state.remainingSeconds === 0) {
                    clearInterval(this.intervalId);
                    return { gameStatus: 'LOST' };
                }
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    isNumberSelected = (numberIndex) => {
        return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
    }

    toggleNumber = (numberIndex) => {
        if (this.state.selectedNumbers.indexOf(numberIndex) >= 0 || (this.state.gameStatus !== 'PLAYING')) {
            this.setState(() => {
                return false;
            });
        } else {
            this.setState((prevState) => {
                return { selectedNumbers: [...prevState.selectedNumbers, numberIndex] };
            }, function () {
                this.calcGameStatus();
            });
        }
    }

    calcGameStatus = () => {
        const sumSelected = this.state.selectedNumbers.reduce((acc, cur) => {
            return acc + this.randomNumbers[cur];
        }, 0);

        let gameStatus = this.checkGameStatus(sumSelected);

        this.setState({
            gameStatus: gameStatus,
        });
    };

    checkGameStatus = (sumSelected) => {
        if (sumSelected < this.target) {
            return 'PLAYING';
        } else if (sumSelected > this.target) {
            clearInterval(this.intervalId);
            this.props.resetGameWinCount();
            return 'LOST';
        } else {
            clearInterval(this.intervalId);
            this.props.incrementGameWinCount();
            return 'WON';
        }
    }

    checkSecondsForLoss = () => {
        if (this.state.remainingSeconds === 0) {
            this.props.resetGameWinCount();
            this.setState({ gameStatus: 'LOST' });
        }
    };

    handlePlayAgainPress = () => {
        this.props.resetGame();
    }

    handleHomePress = () => {
        this.props.backToTitle();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.consecutiveWins}</Text>
                <View style={styles.section1} >
                    <View style={[styles.target, styles[`STATUS_${this.state.gameStatus}`]]}>
                        <Text style={styles.targetText}>{this.target}</Text>
                    </View>
                </View>
                <View style={styles.section2}>
                    {
                        this.shuffledNumbers.map((randomNum, index) => {
                            return (
                                <RandomNumber
                                    key={index}
                                    id={index}
                                    number={randomNum}
                                    isDisabled={this.isNumberSelected(index) || this.state.gameStatus !== 'PLAYING'}
                                    onPress={this.toggleNumber}
                                />
                            );
                        })
                    }
                </View>
                <View>
                    <Timer
                        time={this.state.remainingSeconds}
                        gameStatusOnSeconds={this.checkSecondsForLoss}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    {
                        this.state.gameStatus === 'PLAYING' ? false :
                            <View style={styles.button}>
                                <Button
                                    title="Play Again"
                                    onPress={this.handlePlayAgainPress}>
                                </Button>
                            </View>
                    }
                    <View style={styles.button}>
                        <Button
                            title="Home Screen"
                            onPress={this.handleHomePress}>
                        </Button>
                    </View>
                </View>
                <Text>{this.state.gameStatus}</Text>
                {/* <View style={styles.remainingSpace}>
                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(50,50,50,1)',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 50,
    },
    button: {
        flex: 1,
        backgroundColor: 'rgba(50,50,50,1)',
        borderRadius: 2,
        borderColor: 'black',
        marginHorizontal: 25,
        borderWidth: 1,
    },
    buttonContainer: {
        flex: .75,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    target: {
        paddingHorizontal: 50,
        paddingVertical: 5,
        shadowColor: 'black',
        shadowOffset: {},
        shadowOpacity: 5,
        shadowRadius: 2,
        borderRadius: 5,
    },
    STATUS_WON: {
        backgroundColor: 'rgba(200,255,200,1)',
    },
    STATUS_LOST: {
        backgroundColor: 'rgba(255,200,200,1)',
    },
    STATUS_PLAYING: {
        backgroundColor: 'rgba(200,200,200,1)',
    },
    targetText: {
        fontSize: 30,
        textAlign: 'center',
    },
    section1: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#eee',
    },
    section2: {
        flex: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#eee',
    },
    remainingSpace: {
        flex: 3,
    },
});

export default Game;