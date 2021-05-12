import {
  Comment, Divider, Header, Icon,
} from 'semantic-ui-react';
import img from '../avatar.png';

const CommentList = ({ comments }) => (
  <div>
    <Icon name='reply' color='black' />
    <Header
      as='b'
      size='small'
      content={`${comments.length} replies`}
      style={{ padding: '10px' }}
    />
    <Comment.Group style={{ minWidth: '100%', paddingLeft: '10px' }}>
      {comments.map((comment, i) => (
        <Comment key={i}>
          <Comment.Avatar src={img} />
          <Comment.Content>
            <Comment.Author as='a'>{comment.writer_username}</Comment.Author>
            <Comment.Metadata>
              <div>{comment.posting_date.substring(0, 10)}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.comment}</Comment.Text>
          </Comment.Content>
          <Divider />
        </Comment>
      ))}
    </Comment.Group>
  </div>
);

export default CommentList;
