import styled from 'styled-components';
import Banner from './Banner';
import ThemeToggleButton from 'components/ThemeToggleButton';
import { PagePath } from 'context/PathContext';
import { useState } from 'react';

export default function Layout({ children }) {
  const [isPath, setIsPath] = useState(false);

  return (
    <PagePath.Provider value={{ setIsPath }}>
      <Container>
        {isPath ? <Banner /> : null}
        <Body>{children}</Body>
        <ThemeToggleButton></ThemeToggleButton>
      </Container>
    </PagePath.Provider>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background: ${(props) => props.theme.backgroundColor};
`;

const Body = styled.section`
  flex-grow: 1;
`;
