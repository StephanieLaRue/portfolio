import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.deletePost = this.deletePost.bind(this)
    this.editPost = this.editPost.bind(this)

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

  editPost(eve) {
    let id = eve.target.id;
    let post = "";
    let raw = this.state.rawPosts;
    raw.forEach((ele, ind) => {
      if(ele._id === id) {
        post = ele;
      }
    });

    this.props.edit(post)
  }


  createPosts(fetchedPosts) {

    let posts = fetchedPosts.map((item, ind) => {
      let editButton = this.state.authorized
        ? <button className="editPost" onClick={this.editPost} id={item._id}>Edit</button>
        : null;
      let deleteButton = this.state.authorized
        ? <button className="deletePost" onClick={this.deletePost} id={item._id}>X</button>
        : null;
      return (
        <div key={item._id}>   
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



  deletePost(eve) {
    let id = eve.target.id;

    let obj = {
      id: id
    }

    let url = `${location.origin}/removePost`;
    let params = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    }

    fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
        this.getArchivedPosts()
    })
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
