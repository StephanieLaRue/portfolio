
import React from 'react';
import ReactDOM from 'react-dom'
import CreatePost from './createPosts.jsx'
import GetPosts from './getPosts.jsx';

import css from "./blog.css";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false
    }
    this.getPosts = this.getPosts.bind(this)
    this.getKey = this.getKey.bind(this)
    this.editPosts = this.editPosts.bind(this)
  }

  componentDidMount() {
    let key = localStorage.getItem("key");
    if(!key || key === '' || key === "null") {
      key = new URL(window.location.href).searchParams.get("key")
      localStorage.setItem("key", key)
    } 
    this.getKey(key)
  }

  
  

    getKey(key) {
      let url = `${location.origin}/key`;
      let params = {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify({storedKey: key})
      }

      fetch(url, params)
      .then(function(res) {
          return res.json();
      })
      .then(result => {
        this.setState({
          authorized: result.authorized
        })
      })
  }

  getPosts() {
    this.posts.getArchivedPosts()
  }

  editPosts(data) {
    this.edit.update(data) 
  }

  render() {
    return (
      <div id="component-blog">
        <CreatePost getPosts={this.getPosts} 
        ref={(r) => this.edit = r} 
        authorized={this.state.authorized} />
        <GetPosts ref={(r) => this.posts = r}
          authorized={this.state.authorized}
          edit={this.editPosts}
        />
      </div>
    )
  }
}

ReactDOM.render(<Blog />, document.getElementById('blogContainer'))