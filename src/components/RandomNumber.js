import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

class RandomNumber extends React.Component {

    handlePress = () => {
        this.props.onPress(this.props.id);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handlePress} style={[styles.rowContainer, this.props.isDisabled && styles.disabled]} >
                <Text style={styles.rowContainerText}>{this.props.number}</Text>
            </TouchableOpacity >
        );
    }
}

RandomNumber.propTypes = {
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    rowContainerText: {
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: 20,
    },
    rowContainer: {
        flex: 1,
        backgroundColor: 'rgba(180,180,180,1)',
        marginHorizontal: 50,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        shadowColor: 'black',
        shadowOffset: {},
        shadowOpacity: 1,
        shadowRadius: 1,
        borderRadius: 5,
        borderColor: 'transparent',
        borderWidth: 2,
    },
    disabled: {
        backgroundColor: 'rgba(80,80,80,1)',
        borderColor: 'yellow',
        borderWidth: 2,
    },
});

export default RandomNumber;