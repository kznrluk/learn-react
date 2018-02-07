import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider, connect } from "react-redux";
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom'
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

const Connecter = withRouter(connect(
    mapStore,
    mapDispatch
)(View))


class Header extends React.Component {
    render() {
        return(
            <ul>
            <li>HOME</li>
            <li>1</li>
            <li>2</li>
            </ul>
        ) 
    }
}

class Index extends React.Component {
    render() {
        return(
            <div>これはIndex</div>
        ) 
    }
}

class One extends React.Component {
    render() {
        return(
            <div>これはOne</div>
        ) 
    }
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Header />
                <hr/>
                <Route exact path="/" component={Index} />
                <Route path="/one" component={One} />
                <Route path="/view" component={Connecter} />
            </div>
        </BrowserRouter>
    </Provider>
,document.getElementById('root'));
registerServiceWorker();