/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import {
  Container, Divider, Header, Segment, Comment,
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

      <Comment.Group>
        {comments.map((comment, i) => (
          <Comment key={i}>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>{comment.writer_username}</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>{comment.comment}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>

      <CommentForm post={post} />
    </Container>
  );
};

export default Post;
