import css from './index.css';
import React from 'react';
import ReactDOM from 'react-dom';


class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    this.handlePostBody = this.handlePostBody.bind(this);
    this.handlePostTitle = this.handlePostTitle.bind(this); 
    // this.handlePostDate = this.handlePostDate.bind(this);   
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      postBody: '',
      postTitle: ''
    };
  }

  componentDidMount() {
      this.getArchivedPosts()
  }

  handlePostBody(eve) {
    this.setState({postBody: eve.target.value});
  }

  handlePostTitle(eve) {
    this.setState({postTitle: eve.target.value});
  }

  handleClick(data) {
    let obj = {
      post: this.state.postBody,
      title: this.state.postTitle
    };
    
    this.fetchData(obj);
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

  postNewData(data) {
    let url = `${location.origin}/blog`;
    let params = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    
    fetch(url, params)
    .then(function(res) {
      return res.json();
    })
    .then(function(result) {
      console.log(result);
    })
  }

  render() {
    return (
      <div className="blogPost">
        <div className="inputContainer">
          <input type="text" value={this.state.value} onChange={this.handlePostTitle} id="blogTitle"/>
        </div>
        <div className="inputContainer">
          <textarea value={this.state.value} onChange={this.handlePostBody} id="blogBody"></textarea>
        </div>
        <button className="submit" type="submit" onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
}


ReactDOM.render(<Blog/>, document.getElementById(''))


