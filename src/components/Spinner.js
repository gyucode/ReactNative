import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native'


const Spinner = memo(({ visible, color, size }) => {
    return (
        <>
            {visible && (
                <ActivityIndicator size={size} color={color} style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }}/>
            )}
        </>
    )
});

/** 기본값 정의 */
Spinner.defaultProps = {
    visible: false,
    color: '#06f',
    size: 'large'
};

/** 데이터 타입 설정 */
Spinner.propTypes = {
    visible: PropTypes.bool.isRequired,
    color: PropTypes.string,
    size: PropTypes.string
};

export default Spinner;