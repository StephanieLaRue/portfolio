import css from './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


class Blog extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
      this.getArchivedPosts()
  }


  getArchivedPosts() {
    let url = `${location.origin}/blog`;
    let params = {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    
    fetch(url, params)
    .then(function(res) {
      return res.json();
    })
    .then(result => {
      let posts = result.res.map((item) => {
        return (
            <div key={item.res}>
            </div>
        )
      })
      this.setState({post: posts})
    })
  }


  render() {
    return (
        <div className="container col-sm-8">
            <div id="accordion">
                <div className="card cardContainerBlog">
                    <div className="card-header" id="headingOne">
                    <p className='date' name="date">
                        {/* date */}
                    </p>
                    <h5 className="mb-0">
                    <Button className="btn btn-link blogButton" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        {/* title */}
                    </Button>
                    </h5>
                    </div>
            
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                        {/* body */}
                    </div>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}


ReactDOM.render(<Blog/>, document.getElementById('blogContainer'))


