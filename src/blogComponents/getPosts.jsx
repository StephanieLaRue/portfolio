import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawPosts: [],
      authorized: props.authorized,
      posts: []
    }
    
  }

  componentDidMount() {
      this.getArchivedPosts()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      authorized: nextProps.authorized
    }, () => this.createPosts(this.state.rawPosts))
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
      this.setState({rawPosts: result.data}, () => {
        this.createPosts(this.state.rawPosts)
      })
    })
  }


  createPosts(fetchedPosts) {
    let editButton = this.state.authorized
      ? <button id="editPost">Edit</button>
      : null;
    let deleteButton = this.state.authorized
       ? <button id="deletePost">X</button>
       : null;
       let posts = fetchedPosts.map((item, ind) => {
      return (
        <div key={ind}>
          {deleteButton}
          {editButton}
          <div className="card-header" id="headingOne">
            <p className='date' name="date">
                {/* date */}
                {item.date}
            </p>
            <h5 className="mb-0">
              <button className="btn btn-link blogButton" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  {/* title */}
                  {item.title}
              </button>
            </h5>
          </div>

          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="card-body">
                  {/* body */}
                  {item.post}
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
