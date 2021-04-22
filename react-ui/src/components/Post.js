import { List } from 'semantic-ui-react';

const Post = ({ title, content }) => (
  <List.Item>
    <List.Content>
      <h3>Title: {title}</h3>
      <b>Content: {content}</b>
    </List.Content>
  </List.Item>
);

export default Post;
