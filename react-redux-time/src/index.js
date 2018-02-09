import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux'
import { Provider, connect } from "react-redux";
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import unixtotime from './time.js'
import STARS from './redux-reduser.js'
import * as Actions from './redux-actions.js'

// REDUSER
let store = createStore(STARS);

setInterval(()=>{
    store.dispatch(Actions.CHANGE_TIME());
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
        console.log(this.props)
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
                <StarButton {...this.props}/>
                <TimeButton {...this.props}/>
            </div>
        );
    }
}

class StarButton extends React.Component {
    render(){
        const {
            addStar,
        } = this.props;

        return(
            <button onClick={addStar}>addStar</button>
        )
    }
}
class TimeButton extends React.Component {
    render(){
        const {
            CHANGE_TIME,
        } = this.props;

        return(
            <button onClick={CHANGE_TIME}>CHANGE_TIME</button>
        )
    }
}

const mapStateToProps = state => {
    return {
        time: state.time,
        count: state.count
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Actions, dispatch)
}

const RootConnecter = connect(
    mapStateToProps,
    mapDispatchToProps
)(View)

ReactDOM.render(
<Provider store={store}>
    <RootConnecter />
</Provider>,
document.getElementById('root'));
registerServiceWorker();
