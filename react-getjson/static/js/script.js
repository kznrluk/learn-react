class TextViewer extends React.Component {
    constructor(props) {
        super(props)
    }
    render (){
        return (
            <div>{JSON.stringify(this.props.Content)}</div>
        )
    }
}


class Contents extends React.Component {
    constructor(props) {
        super(props);
        this.state = { GAMEID: '', ping: false , result: {}, value : '' };
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        axios.get('/api/ping').then((res) => {
            this.setState({ping: true});
        });
    }

    handleKeyPress(event) {
        if(event.keyCode == 13){
            this.handleSubmit();
        }
    }

    handleSubmit() {
        var json;
        axios.get('/api/json/'+this.state.value).then((res) => {
            json = res.data;
            this.setState({result: json})
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        var result;
        if(Object.keys(this.state.result).length === 0){
            result = ""
        } else {
            result = <TextViewer Content={this.state.result}/>
        }

        return(
            <div className='mainbox col-8 mx-auto'>
                <h1>React JSON Viewer</h1>
                <div className="mx-auto">
                    <div className="form-inline">
                        <div className="form-group mx-sm-3 mb-2">
                            <input className="form-control"
                                value={this.state.value}
                                onKeyDown={this.handleKeyPress}
                                onChange={this.handleChange}
                                id="jsonInput"
                                placeholder="Enter json file name."
                                disabled={!this.state.ping}
                                ></input>
                        </div>
                        <button onClick={() => {this.handleSubmit()}} className="btn btn-primary mb-2" disabled={!this.state.ping}>CONFIRM</button>
                    </div>
                    {result}
                </div>
            </div>
        )
    }
}

class MainContents extends React.Component {
    render() {
        return(
            <div className='container'>
                <div className='row'>
                    <Contents />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <MainContents />,
    document.getElementById('main')
)