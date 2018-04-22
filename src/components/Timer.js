import React from 'react';
import { Text } from 'react-native';

import PropTypes from 'prop-types';

class Timer extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (nextProps.time !== this.props.time);
    }

    componentDidUpdate() {
        this.props.gameStatusOnSeconds();
    }

    render() {
        return (
            <Text >{this.props.time}</Text>
        );
    }
}

Timer.propTypes = {
    time: PropTypes.number.isRequired,
    gameStatusOnSeconds: PropTypes.func.isRequired,
};

export default Timer;