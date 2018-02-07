import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider, connect } from "react-redux";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import unixtotime from './time.js'

const initTime = new Date().getTime()
const init = {
    text: "HELLO",
    count: 2,
    time: initTime
}

// REDUSER
const ADD_STAR = "ADD_STAR";
const RELOAD_TIME = "RELOAD_TIME";
const STARS = (state = init, action) => {
    switch(action.type){
        case ADD_STAR:
            console.log(state.count)
            return Object.assign({}, state, {
               count: state.count * 2
            });
        case RELOAD_TIME:
            return Object.assign({}, state, {
                time: action.value
            });
        default:
            return Object.assign({}, state, {
            });
    }
}

let store = createStore(STARS);


// ACTION
const addStar = () => {
    return {
        type: ADD_STAR
    }
}
const CHANGE_TIME = () => {
    const nowTime = new Date().getTime()
    return {
        type: RELOAD_TIME,
        value: nowTime
    }
}

setInterval(()=>{
    store.dispatch(CHANGE_TIME());
    console.log('changed')
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
