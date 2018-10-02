import React, { Component } from 'react';
import axios from "axios";
import Post from "./Post/Post"
import './App.css';
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPosts = this.searchPosts.bind( this );
  }
  
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then(res=>{
      this.setState({posts:res.data})
    })
  }

  updatePost(id,text) {
    let textToJSON = {
      "text":text
    }
    axios.put("https://practiceapi.devmountain.com/api/posts?id="+id,textToJSON).then(res=>{
      this.setState({posts:res.data})
    })
  }

  deletePost(id) {
    axios.delete("https://practiceapi.devmountain.com/api/posts?id="+id).then(res=>{
      this.setState({posts:res.data});
    })
  }

  createPost(text) {
    let textToJSON = {
      "text":text
    }
    axios.post("https://practiceapi.devmountain.com/api/posts",textToJSON).then(res=>{
      this.setState({posts:res.data})
    })
  }
  searchPosts(text){
    let searchText = encodeURI(text)
    axios.get("https://practiceapi.devmountain.com/api/posts/filter?text="+searchText).then(res=>{
      this.setState({posts:res.data})
    })
  }

  render() {
    const { posts } = this.state;
    let listPosts = posts.map(post=>(
      <Post 
        key={post.id} 
        text={post.text} 
        date={post.date}
        updatePostFn={this.updatePost} 
        id={post.id}
        deletePostFn={this.deletePost}
      />
    ))
    console.log(this.state)
    return (
      <div className="App__parent">
        <Header searchPosts={this.searchPosts}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {listPosts}
        </section>
      </div>
    );
  }
}

export default App;
