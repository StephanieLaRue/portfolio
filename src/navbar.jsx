
import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Nav} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

export default class Navigation extends React.Component {

  // constructor(props) {
  //     super(props)
  //     this.state = {}
  // }

  componentDidMount() {
  }

  render() {

    let blogActive = location.href.indexOf("blog.html") > -1;

    return (
      <div>
        <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className={`navbar-brand ${blogActive ? "" : "active"}`} href="/index.html">Steph LaRue</a>
            <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </Button>
            <div className="collapse navbar-collapse" id="navbar">
              <div className="navbar-nav">
                <a className={`nav-item nav-link ${blogActive ? "" : "active"}`} href="/index.html">Portfolio <span className="sr-only">(current)</span></a>
                <a className={`nav-item nav-link ${blogActive ? "active" : ""}`} href="/blog.html">Blog</a>
              </div>
            </div>
        </Nav>
      </div>
    )
  }
}

ReactDOM.render(<Navigation/>, document.getElementById('navBar'))

// export default Entry;
