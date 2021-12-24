import React from 'react';
import {
  Grid, Header,
} from 'semantic-ui-react';
import PostsList from '../components/PostsList';
import '../style/index.css';
import img from '../style/header.jpg';

const HomePage: React.FC = () => (
  <div>
    <Grid>
      <Grid.Row
        color="black"
        textAlign="center"
        style={{
          padding: '150px',
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 1000px',
        }}
      >
        <Grid.Column width={16} textAlign="center">
          <Header
            style={{ fontSize: '64px' }}
            inverted
          >
            <p>
              <span>Programming Forum</span>
              <span className="blinking">_</span>
            </p>
          </Header>
          <Header
            style={{ fontSize: '22px' }}
            inverted
            content="Your number #1 place for talking about coding related stuff!"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row color="black">
        <Grid.Column
          width={16}
          textAlign="center"
        >
          <Header inverted as="h2" content="Posts" />
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <PostsList />
  </div>
);

export default HomePage;
