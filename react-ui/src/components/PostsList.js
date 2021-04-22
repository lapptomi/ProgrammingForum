/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Header, List, Segment } from 'semantic-ui-react';
import postService from '../services/postService';
import Post from './Post';

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAll()
      .then((result) => setPosts(result))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Segment size='big'>
      <Header as='h2' content='Posts: ' />
      <List divided>
        {posts.map((post, i) => (
          <List.Item key={i}>
            <Post title={post.title} content={post.content} />
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

export default PostsList;
