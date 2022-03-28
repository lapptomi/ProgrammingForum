import React from 'react';
import {
  Grid,
  Container,
  List,
  Header,
  Divider,
} from 'semantic-ui-react';
import '../style/Footer.css';

const Footer: React.FC = () => (
  <Grid id="footer-grid">
    <Grid.Row id="footer-grid-row-1">
      <Grid.Column width={16}>
        <Container textAlign="center">
          <Grid divided inverted>
            <Grid.Column width={16}>
              <Header inverted as="h2" content="Programming Forum" />
              <p id="footer-text">© 2021 All Rights Reserved jne</p>
            </Grid.Column>
          </Grid>
          <Divider inverted section />
          <List horizontal inverted link size="small">
            <List.Item as="a" href="#">Site Map</List.Item>
            <List.Item as="a" href="#">Contact Us</List.Item>
            <List.Item as="a" href="#">Terms and Conditions</List.Item>
            <List.Item as="a" href="#">Privacy Policy</List.Item>
          </List>
        </Container>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Footer;
