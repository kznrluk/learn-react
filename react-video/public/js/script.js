

const DEFAULT_PAGEINFO = {
    title : "MMPTESTPAGE",
    modules : [{
        name : "WebCam",
        link : "/camera"
    }]
}

class NavbarModules extends React.Component{
    render(){
        return(
            <li className="nav-item">
                <a className="nav-link" href={this.props.module.link}>{this.props.module.name}</a>
            </li>
        )
    }
}

class SetNavbar extends React.Component{
    render(){
        var content = [];
        for(const mod of DEFAULT_PAGEINFO.modules){
            content.push(<NavbarModules key={mod.name} module={mod} />);
        }
        return(
            <nav className="navbar navbar-expand-md navbar-dark bg-dark navber-shadow">
                <h1 className="navbar-brand mb-0">{DEFAULT_PAGEINFO.title}</h1>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        {content}
                    </ul>
                </div>
            </nav>
        )
    }
}

class MainBox extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-10 mx-auto mainbox">
                        <Video />
                    </div>
                </div>
            </div>
        )
    }
}

class Video extends React.Component {
    render(){
        return(
            <video src="/stream"></video>
        )
    }
}

ReactDOM.render(
    <SetNavbar />,
    document.getElementById('nav')
)
ReactDOM.render(
    <MainBox />,
    document.getElementById('main')
)