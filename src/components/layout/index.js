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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background: var(--gray20);
`;

const Body = styled.section`
  flex-grow: 1;
`;
