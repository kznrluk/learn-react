import * as ACTION from './redux-types'
// ACTION
export const addStar = () => {
    return {
        type: ACTION.ADD_STAR
    }
}
export const CHANGE_TIME = () => {
    const nowTime = new Date().getTime()
    return {
        type: ACTION.RELOAD_TIME,
        value: nowTime
    }
}
