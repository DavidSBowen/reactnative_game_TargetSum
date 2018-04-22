import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

class Start extends React.Component {

    handlePress = () => {
        this.props.startGame();
    }

    render() {
        return (
            <View style={styles.button}>
                <Button title="Start" onPress={this.handlePress} />
            </View>
        );
    }
}

Start.propTypes = {
    startGame: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
});

export default Start;