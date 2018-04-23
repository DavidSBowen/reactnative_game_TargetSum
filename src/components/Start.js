import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class Start extends React.Component {

    handlePress = () => {
        this.props.startGame();
    }

    render() {
        return (
            <View style={styles.buttonContainer}>
                <View style={styles.pad}>
                    <Text style={styles.padText}>
                        Numbers Game
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonView}
                    title="Start"
                    onPress={this.handlePress} >
                    <Text style={styles.buttonText}>
                        Start Game
                    </Text>
                </TouchableOpacity>
                <View style={styles.pad2} />
            </View>
        );
    }
}

Start.propTypes = {
    startGame: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    pad: {
        flex: 2,
        justifyContent: 'center',
    },
    padText: {
        fontSize: 40,
    },
    pad2: {
        flex: .5,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    buttonView: {
        flex: .25,
        backgroundColor: '#666',
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 2,
    },
    buttonText: {
        fontSize: 30,

    },
});

export default Start;