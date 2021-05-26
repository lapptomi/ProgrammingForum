/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
  Comment, Divider, Header, Icon,
} from 'semantic-ui-react';
import React from 'react';
import img from '../style/avatar.png';
import { FIND_COMMENTS_BY_POST_ID, LIKE_COMMENT } from '../queries/comment';
import { useGlobalState } from '../state/state';
import Loading from './Loading';
import { IComment } from '../types';

const CommentList: React.FC = () => {
  const [state] = useGlobalState();

  const [likeComment] = useMutation(LIKE_COMMENT);

  const handleCommentLike = (commentId: number) => {
    if (!state.isLoggedIn) {
      window.alert('Please sign in to like comments');
      return;
    }

    likeComment({ variables: { commentId } })
      .then(() => window.location.reload())
      .catch((error) => window.alert(error));
  };

  const { id } = useParams<{ id: string }>();
  const { loading, data } = useQuery(FIND_COMMENTS_BY_POST_ID, {
    variables: { postId: id },
  });

  if (loading) {
    return <Loading />;
  }
  if (!data) {
    return null;
  }

  const comments = data.findComments;

  return (
    <div>
      <Icon name="reply" color="black" />
      <Header
        as="b"
        size="small"
        content={`${comments.length} replies`}
        style={{ padding: '10px' }}
      />
      <Comment.Group style={{ minWidth: '100%', paddingLeft: '10px' }}>
        {comments.map((comment: IComment, i: number) => (
          <Comment key={i}>
            <Comment.Avatar src={img} />
            <Comment.Content>
              <Comment.Author as="a">{comment.username}</Comment.Author>
              <Comment.Metadata>
                <div>{comment.created_at.substring(0, 10)}</div>
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
