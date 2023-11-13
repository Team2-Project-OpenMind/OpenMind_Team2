import * as style from 'pages/landing/LandingStyle';
import { styled } from 'styled-components';

export default function PageNotFound() {
  return (
    <Container>
      <A href="/">
        <style.Logo alt="로고" />
      </A>
      <H1>Page Not Found!</H1>
    </Container>
  );
}

const Container = styled(style.Container)`
  height: 100vh;
`;

const A = styled.a`
  display: block;
  margin-top: 10rem;
  margin-bottom: 3rem;
  width: 45.6rem;

  text-align: center;
  cursor: pointer;

  & img {
    display: block;
    width: 45.6rem;
  }
`;

const H1 = styled.h1`
  font: 700 4rem 'Actor';
  color: ${(props) => props.theme.textColor};
`;
