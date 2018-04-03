
import React from 'react';
import ReactDOM from 'react-dom'
import CreatePost from './createPosts.jsx'
import GetPosts from './getPosts.jsx'

import './blog.css'

class Blog extends React.Component {
    constructor(props) {
      super(props);
    }
  
    componentDidMount() {
    }

    render() {
        return (
            <div id="component-blog">
                <CreatePost />
                <GetPosts />
            </div>
        )
    }
}

ReactDOM.render(<Blog/>, document.getElementById('blogContainer'))