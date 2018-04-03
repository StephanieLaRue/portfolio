import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
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
      }
    }
    
    fetch(url, params)
    .then(function(res) {
      return res.json();
    })
    .then(result => {
      this.createPosts(result.data)
    })
  }


  createPosts(fetchedPosts) {
    let posts = fetchedPosts.map((item, ind) => {
      return (
        <div key={ind}>
          <div className="card-header" id="headingOne">
            <p className='date' name="date">
                {/* date */}
                {item.date}
            </p>
            <h5 className="mb-0">
              <Button className="btn btn-link blogButton" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  {/* title */}
                  {item.title}
              </Button>
            </h5>
          </div>

          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="card-body">
                  {/* body */}
                  {item.body}
              </div>
          </div>
        </div>
      )
    })
    this.setState({posts: posts})
  }


  render() {




    return (
        <div className="container col-sm-8">
            <div id="accordion">
              <div className="card cardContainerBlog">
                {this.state.posts}
              </div>
            </div>
      </div>
    )
  }
}

module.exports = Posts;
