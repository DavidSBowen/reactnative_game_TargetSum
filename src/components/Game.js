import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

import RandomNumber from './RandomNumber';

class Game extends React.Component {

    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
    };

    state = {
        selectedNumbers: [],
        gameStatus: 'PLAYING',
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

    // TODO: Shuffle numbers

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
            }, function() {
                this.gameStatus();
            });
        }
    }

    // gameStatus: PLAYING, WON, LOST

    gameStatus = () => {
        const sumSelected = this.state.selectedNumbers.reduce((acc, cur) => {
            return acc + this.randomNumbers[cur];
        }, 0);

        let gameStatus = (sumSelected < this.target) ? 'PLAYING' : (sumSelected > this.target) ? 'LOST' : 'WON';

        this.setState({
            gameStatus: gameStatus,
        });
    };

    handlePlayAgainPress = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.section1} >
                    <View style={[styles.target, styles[`STATUS_${this.state.gameStatus}`]]}>
                        <Text style={styles.targetText}>{this.target}</Text>
                    </View>
                </View>
                <View style={styles.section2}>
                    {
                        this.randomNumbers.map((randomNum, index) => {
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
                <Button title="Play Again?" onPress={this.handlePlayAgainPress}></Button>
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