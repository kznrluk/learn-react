import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider, connect } from "react-redux";
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import unixtotime from './time.js'
import STARS from './redux-reduser.js'
import * as ACTION from './redux-types.js'

// REDUSER
let store = createStore(STARS);


// ACTION
const addStar = () => {
    return {
        type: ACTION.ADD_STAR
    }
}
const CHANGE_TIME = () => {
    const nowTime = new Date().getTime()
    return {
        type: ACTION.RELOAD_TIME,
        value: nowTime
    }
}

setInterval(()=>{
    store.dispatch(CHANGE_TIME());
},1000)

console.log(store.getState().count)

class Clock extends React.Component {
    constructor(props){
        super(props)
        console.log(this.props.time)
    }
    render (){
        const time = unixtotime(this.props.time / 1000)
        return(
            <div>
                <p>NOW: {time}</p>
                <p>UNIX: {this.props.time}</p>
            </div>
        )
    }
}


class View extends React.Component {
    constructor(props){
        super(props);
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
                <Clock time={this.props.time}/>
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
