import { Comment, Divider, Header } from 'semantic-ui-react';

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return <Header as='b' subheader='No Comments Added Yet...' />;
  }
  return (
    <Comment.Group>
      {comments.map((comment, i) => (
        <Comment key={i}>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
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
  );
};

export default CommentList;
