/* eslint-disable no-alert */
import {
  Comment, Divider, Header, Icon,
} from 'semantic-ui-react';
import img from '../avatar.png';
import commentService from '../services/commentService';
import { useGlobalState } from '../state/state';

const CommentList = ({ comments }) => {
  const [state] = useGlobalState();

  const handleCommentLike = (commentId) => {
    if (!state.isLoggedIn) {
      window.alert('Please sign in to like comments');
      return;
    }
    commentService.addLike(commentId)
      .then(() => window.location.reload())
      .catch(({ response }) => window.alert(response.data));
  };

  return (
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
              <Comment.Author as='a'>{comment.username}</Comment.Author>
              <Comment.Metadata>
                <div>{comment.created_at.substring(0, 10)}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.comment}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={() => handleCommentLike(comment.id)}>
                  <Icon name='like' id='commentLikeButton' />
                  <span id='commentLikes'>{comment.likes} Likes</span>
                </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
            <Divider />
          </Comment>
        ))}
      </Comment.Group>
    </div>
  );
};

export default CommentList;
