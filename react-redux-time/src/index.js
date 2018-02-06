import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider, connect } from "react-redux";
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const init = {
    text: "HELLO",
    count: 0
}

// REDUSER
function STARS(state = init, action){
    switch(action.type){
        case 'ADD_STAR':
            return Object.assign({}, state, {
               count: state.count++
            });
        default:
            ;
    }
}

let store = createStore(STARS);

const ADD_STAR = "ADD_STAR"

// ACTION
const addStar = () => {
    console.log('DISPATCH')
    return {
        type: ADD_STAR
    }
}



class View extends React.Component {
    constructor(props){
        super(props);
        this.status = {
            stars : 10
        }
    }
    onClick() {
        store.dispatch(addStar());
    }
    render (){
        let stars = ""
        for(let i = 0; i <= this.status.stars ; i++){
            stars = stars + '☆'
        }
        return (
            <div>
                HELLO{stars}
                <button onClick={this.onClick}>☆</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return store
}


const Connecter = connect(
    mapDispatchToProps
)(View)

ReactDOM.render(
<Provider store={store}>
    <Connecter />
</Provider>,
document.getElementById('root'));
registerServiceWorker();
