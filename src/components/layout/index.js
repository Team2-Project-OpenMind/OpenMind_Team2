import styled from 'styled-components';

import Banner from './Banner';

export default function Layout({ Children }) {
  return (
    <Container>
      <Banner />
      <section>{Children}</section>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
