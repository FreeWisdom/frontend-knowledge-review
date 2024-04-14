import React from 'react';

const propTypes = {};
const defaultProps = {};

const PropertyBroker = (title) => (Component) => {
    return (props) => {
        const diyStyle = {
            margin: '10px',
            padding: '10px',
            border: '1px solid #eee'
        };

        return (
            <div style={diyStyle}>
                <h2>{title}</h2>
                <Component {...props} />
            </div>
        )
    }
}

PropertyBroker.propTypes = propTypes;
PropertyBroker.defaultProps = defaultProps;

export default PropertyBroker;