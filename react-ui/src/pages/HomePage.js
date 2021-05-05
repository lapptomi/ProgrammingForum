import { Grid, Header, Icon } from 'semantic-ui-react';
import PostsList from '../components/PostsList';

const HomePage = () => (
  <div>
    <Grid>
      <Grid.Row
        color='violet'
        textAlign='center'
        style={{ padding: '150px' }}
      >
        <Grid.Column width={16} textAlign='center'>
          <Header
            style={{ fontSize: '64px' }}
            inverted
          >
            <Icon name='code' /> Programming Forum
          </Header>
          <Header
            style={{ fontSize: '22px' }}
            inverted
            content='Your number #1 place for talking about coding related stuff!'
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <PostsList />
  </div>
);

export default HomePage;
