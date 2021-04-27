import { List } from 'semantic-ui-react';

const Post = ({ title, description }) => (
  <List.Item>
    <List.Content>
      <h3>Title: {title}</h3>
      <b>Description: {description}</b>
    </List.Content>
  </List.Item>
);

export default Post;
