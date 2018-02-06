import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Player } from 'video-react';

class Streaming extends Component {
    constructor(props){
        super(props);
        this.state = {
            playerSource: this.props.videourl
        }
    }
    render(){
        return(
            <div className="">
                <Player ref="player" autoPlay>
                    <source src={this.state.playerSource} />
                </Player>
            </div>
        )
    }
}


class MainBox extends React.Component{
    constructor(props){
        super(props)
        this.state = { ready : false, current : 0 } 
    }

    render(){
        var vid;
        if(this.state.ready) vid = (<Streaming videourl={'http://localhost:3001/stream'} />)
        else vid = ""
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-10 mx-auto mainbox">
                        {vid}
                    </div>
                </div>
            </div>
        )
    }
}

export default MainBox;
