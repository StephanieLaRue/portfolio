import React from 'react';
import ReactDOM from 'react-dom';


// send a new post, edit, or delete should check for authorized key

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    
    this.handlePostBody = this.handlePostBody.bind(this);
    this.handlePostTitle = this.handlePostTitle.bind(this);   
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      postDate: this.date(),
      postBody: '',
      postTitle: '',
      id: ''
    };  
  }

  componentDidMount() {
  }

  handlePostBody(eve) {
    this.setState({postBody: eve.target.value});
  }

  handlePostTitle(eve) {
    this.setState({postTitle: eve.target.value});
  }

  handleClick() {
    let newPost = {
      post: this.state.postBody,
      title: this.state.postTitle,
      date: this.state.postDate,
      _id: this.state.id,
    };

    this.postNewData(newPost);
  }
  
  postNewData(data) {
    let key = localStorage.getItem("key")
    data.blogKey = key

    let url = `${location.origin}/newPost`;
    let params = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    
    
    fetch(url, params)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      this.setState({
        postDate: this.date(),
        postBody: '',
        postTitle: '',
        id: ''
      })
      this.props.getPosts()
    })
  }

  update(data) {
    this.setState({
      postTitle: data.title,
      postBody: data.post,
      postDate: data.date,
      id: data._id
    });
  }

  date() {
    let date = new Date();
    let day = date.getDate();
    // day = day.length > 1 ? day : '0' + day;

    let month = date.getMonth();
    let matchMonth = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    let year = date.getFullYear();
    let displayDate = matchMonth[month] + ' ' + day + ', ' + year;
    return displayDate;
  }

  render() {

    if(!this.props.authorized) {return null}

    return (
      <div className="blogPost">
      <h2 className="form-heading">New Post:</h2>
        <div className="inputContainer">
          <input type="text" onChange={this.handlePostTitle} value={this.state.postTitle} id="blogTitle"/>
        </div>
        <div className="inputContainer">
          <textarea onChange={this.handlePostBody} value={this.state.postBody} id="blogBody"></textarea>
        </div>
        <button className="submit" onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
}

module.exports = CreatePost;


