import React from 'react';
import {
  Grid, Header,
} from 'semantic-ui-react';
import PostsList from '../components/PostsList';
import '../style/index.css';
import '../style/HomePage.css';

const HomePage: React.FC = () => (
  <div>
    <Grid>
      <Grid.Row id="homepage-row-1">
        <Grid.Column width={16} textAlign="center">
          <Header id="homepage-row-1-header1">
            <p>
              <span>Programming Forum</span>
              <span className="blinking">_</span>
            </p>
          </Header>
          <Header id="homepage-row-1-header2">
            Your number #1 place for talking about coding related stuff!
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row color="black">
        <Grid.Column width={16} textAlign="center">
          <Header inverted as="h2" content="Posts" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <PostsList />
  </div>
);

export default HomePage;
