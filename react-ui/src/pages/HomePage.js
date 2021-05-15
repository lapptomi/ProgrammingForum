import { Link } from 'react-router-dom';
import {
  Grid, Header, Icon,
} from 'semantic-ui-react';
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
      <Grid.Row color='black'>
        <Grid.Column
          width={8}
          textAlign='right'
          style={{ paddingRight: '100px' }}
        >
          <Link to={{ pathname: '/posts', search: '?sort=likes' }}>
            <Header inverted as='h2' content='Popular Posts' />
          </Link>
        </Grid.Column>
        <Grid.Column
          width={8}
          textAlign='left'
          style={{ paddingLeft: '100px' }}
        >
          <Link to={{ pathname: '/posts', search: '?sort=date' }}>
            <Header inverted as='h2' content='Newest Posts' />
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <PostsList />
  </div>
);

export default HomePage;
