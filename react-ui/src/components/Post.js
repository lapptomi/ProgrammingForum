import {
  Container, Divider, Header, Segment,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

const Post = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  const comments = [
    { writer: 'randomuser123', comment: 'random comment 1' },
    { writer: 'dragonslayer123', comment: 'random comment666' },
  ];

  if (!post) {
    return (
      <Container textAlign='center' style={{ padding: '50px' }}>
        <h1>No post found with given id</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Segment size='huge'>
        <Header as='h1' content={post.title} />
        <Divider />
        <p>{post.description}</p>
      </Segment>
      <Header as='h2' content='Comments:' />
      {comments.map((comment, i) => (
        <Segment key={i}>
          <Header as='h1' content={comment.writer} />
          <Divider />
          <p>{comment.comment}</p>
        </Segment>
      ))}
    </Container>
  );
};

export default Post;
