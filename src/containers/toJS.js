import React from 'react';
import { Iterable } from 'immutable';

export const toJS = (WrappedComponent) => {
    return (props) => {
        const newProps = Object.keys(props).reduce((accum, key) => {
            accum[key] = Iterable.isIterable(props[key]) ? props[key].toJS() : props[key];
            return accum;
        }, {});

        return <WrappedComponent {...newProps} />;
    }
}