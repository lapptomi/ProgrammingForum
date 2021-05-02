/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import {
  Container, Divider, Header, Segment,
} from 'semantic-ui-react';
import postService from '../services/postService';
import CommentForm from './CommentForm';

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    postService.findCommentsByPostId(post.id)
      .then((result) => setComments(result))
      .catch((error) => console.log(error.message));
  }, [post.id]);

  return (
    <Container>
      <Header
        style={{ marginTop: '50px' }}
        as='h1'
        content={`Post ${post.id}`}
        subheader={`Original poster id: ${post.original_poster_id}`}
      />
      <Segment size='huge'>
        <Header as='h1' content={post.title} />
        <Divider />
        <p>{post.description}</p>
      </Segment>
      <Header as='h3' content='Comments:' />

      {comments.map((c, i) => (
        <Segment key={i}>
          <Header
            as='b'
            subheader={`ID: ${c.writer_id} ${c.writer_username}`}
          />
          <Divider />
          <b>{c.comment}</b>
        </Segment>
      ))}

      <CommentForm post={post} />
    </Container>
  );
};

export default Post;
