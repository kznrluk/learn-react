import * as ACTION from './redux-types.js'

const initTime = new Date().getTime()
const init = {
    text: "HELLO",
    count: 2,
    time: initTime
}

export default (state = init, action) => {
    switch(action.type){
        case ACTION.ADD_STAR:
            console.log(state.count)
            return Object.assign({}, state, {
               count: state.count * 2
            });
        case ACTION.RELOAD_TIME:
            return Object.assign({}, state, {
                time: action.value
            });
        default:
            return Object.assign({}, state, {
            });
    }
}