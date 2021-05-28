/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
import { useMutation } from '@apollo/client';
import {
  Comment, Divider, Header, Icon,
} from 'semantic-ui-react';
import React from 'react';
import img from '../style/avatar.png';
import { LIKE_COMMENT } from '../queries/comment';
import { useGlobalState } from '../state/state';
import { IComment } from '../types';

interface Props {
  comments: Array<IComment>
}

const CommentList: React.FC<Props> = ({ comments }) => {
  const [state] = useGlobalState();

  const [likeComment] = useMutation(LIKE_COMMENT);

  const handleCommentLike = (commentId: string) => {
    if (!state.isLoggedIn) {
      window.alert('Please sign in to like comments');
      return;
    }

    likeComment({ variables: { commentId } })
      .then(() => window.location.reload())
      .catch((error) => window.alert(error));
  };

  console.log('comments =', comments);

  return (
    <div>
      <Icon name="reply" color="black" />
      <Header
        as="b"
        size="small"
        content="0 replies"
        style={{ padding: '10px' }}
      />
      <Comment.Group style={{ minWidth: '100%', paddingLeft: '10px' }}>
        {comments.map((comment: IComment) => (
          <Comment key={comment.id}>
            <Comment.Avatar src={img} />
            <Comment.Content>
              <Comment.Author as="a">{comment.comment_writer.username}</Comment.Author>
              <Comment.Metadata>
                <div>NULL</div>
              </Comment.Metadata>
              <Comment.Text>{comment.comment}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={() => handleCommentLike(comment.id)}>
                  <Icon name="like" id="commentLikeButton" />
                  <span id="commentLikes">
                    {comment.likes}
                    {' '}
                    Likes
                  </span>
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
