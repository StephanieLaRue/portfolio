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
      postDate: this.date(),
      postBody: '',
      postTitle: ''
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

  handleClick(data) {
    let obj = {
      post: this.state.postBody,
      title: this.state.postTitle,
      date: this.state.postDate
    };
    
    this.postNewData(obj);
  }



  postNewData(data) {
    let url = `${location.origin}/newPost`;
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
    return (
      <div className="blogPost">
      <h2 className="form-heading">New Post:</h2>
        <div className="inputContainer">
          <input type="text" onChange={this.handlePostTitle} id="blogTitle"/>
        </div>
        <div className="inputContainer">
          <textarea onChange={this.handlePostBody} id="blogBody"></textarea>
        </div>
        <button className="submit" onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
}

module.exports = CreatePost;


