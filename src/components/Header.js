import styled from 'styled-components';
import arrowRight from '../assets/images/arrow-right.svg';
import { breakPoints } from './common/Media';
import { useNavigate } from 'react-router';

export default function Header({ saveCookie }) {
  console.log(saveCookie);
  const navigate = useNavigate();
  const handleNavigator = (e) => {
    e.preventDefault();
    if (!saveCookie) {
      alert('회원가입하지 않았습니다.');
      navigate('/');
    } else {
      navigate(`/post/${saveCookie}/answer`);
    }
  };
  return (
    <ListPageHeader>
      <HeaderWrap>
        <a href="/">
          <h1>
            <img src="images/logo.svg" alt="로고이미지" />
          </h1>
        </a>
        <GoAskButton type="button" onClick={handleNavigator}>
          <span>답변하러 가기</span>
          <img src={arrowRight} alt="화살표 이미지" />
        </GoAskButton>
      </HeaderWrap>
    </ListPageHeader>
  );
}

const ListPageHeader = styled.header`
  width: 100%;
  max-width: 1004px;
  margin: 0 auto;
  padding: 0 3.2rem;
  @media screen and (${breakPoints.mobile}) {
    max-width: 500px;
    padding: 0 2.4rem;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 0;

  a {
    text-decoration: none;
  }

  h1 {
    width: 146px;
    height: 57px;
    img {
      width: 100%;
      content: ${(props) => props.theme.logoImage};
    }
  }
  @media screen and (${breakPoints.mobile}) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const GoAskButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  border: 1px solid var(--brown40);
  padding: 1.2rem 2.4rem;
  background-color: ${(props) => props.theme.btnColor};
  color: ${(props) => props.theme.textColor};
  font-size: 1.6rem;
  font-weight: 400;
  font-family: Actor;
  text-decoration: none;
  span {
    line-height: 1px;
  }
  & img {
    margin-left: 0.8rem;
    width: 18px;
  }
  @media screen and (${breakPoints.mobile}) {
    padding: 0.8rem 1.2rem;
    font-size: 1.4rem;
  }
`;
