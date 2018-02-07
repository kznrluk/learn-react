import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider, connect } from "react-redux";
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const init = {
    text: "HELLO",
    count: 2
}

// REDUSER
const STARS = (state = init, action) => {
    switch(action.type){
        case 'ADD_STAR':
            console.log(state.count)
            return Object.assign({}, state, {
               count: state.count * state.count
            });
        default:
            return Object.assign({}, state, {
            });
    }
}

let store = createStore(STARS);

const ADD_STAR = "ADD_STAR"

// ACTION
const addStar = () => {
    return {
        type: ADD_STAR
    }
}

console.log(store.getState().count)


class View extends React.Component {
    constructor(props){
        super(props);
        this.status = {
            stars : 10
        }
        this.onClick = this.onClick.bind(this)
    }
    onClick() {
        this.props.onClick();
    }
    render (){
        let stars = ""
        for(let i = 0; i <= store.getState().count ; i++){
            stars = stars + '☆'
        }
        return (
            <div>
                <p>HELLO{stars}</p>
                <button onClick={this.onClick}>☆</button>
            </div>
        );
    }
}

const mapStore = state => {
    return state
}

const mapDispatch = dispatch => {
    return {
        onClick() {
            dispatch(addStar());
        }
    }
}

const Connecter = connect(
    mapStore,
    mapDispatch
)(View)

ReactDOM.render(
<Provider store={store}>
    <Connecter />
</Provider>,
document.getElementById('root'));
registerServiceWorker();
