/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
import { useMutation } from '@apollo/client';
import {
  Comment, Divider, Icon,
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

  return (
    <div>
      <Icon name="reply" color="black" />
      <b id="comment-list-b">{`${comments.length} replies`}</b>
      <Comment.Group style={{ minWidth: '100%', paddingLeft: '10px' }}>
        {comments.map((comment: IComment) => (
          <Comment key={comment.id}>
            <Comment.Avatar src={img} />
            <Comment.Content>
              <Comment.Author as="a">{comment.comment_writer.username}</Comment.Author>
              <Comment.Metadata><div>{comment.created_at}</div></Comment.Metadata>
              <Comment.Text>{comment.comment}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={() => handleCommentLike(comment.id)}>
                  <Icon name="like" id="commentLikeButton" />
                  <span id="commentLikes">{`${comment.likers.length} Likes`}</span>
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
