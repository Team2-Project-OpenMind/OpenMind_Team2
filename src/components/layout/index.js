import styled from 'styled-components';
import Banner from './Banner';
import ThemeToggleButton from 'components/ThemeToggleButton';

const HIDDEN_BANNER = ['/', '/list'];

export default function Layout({ children }) {
  const pathName = window.location.pathname;
  const isHidden = HIDDEN_BANNER.includes(pathName);

  return (
    <Container>
      {!isHidden && <Banner />}
      <Body>{children}</Body>
      <ThemeToggleButton></ThemeToggleButton>
    </Container>
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
