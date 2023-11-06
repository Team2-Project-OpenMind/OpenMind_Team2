import styled from 'styled-components';

import Banner from './Banner';

const HIDDEN_BANNER = ['/', '/list'];

export default function Layout({ children }) {
  const pathName = window.location.pathname;
  const isHidden = HIDDEN_BANNER.includes(pathName);

  return (
    <Container>
      {!isHidden && <Banner />}
      <Body>{children}</Body>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Body = styled.section``;
