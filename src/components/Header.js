import styled from 'styled-components';
import arrowRight from '../assets/images/arrow-right.svg';
import arrowDown from '../assets/images/arrow-down.svg';
import { breakPoints } from './common/Media';
import { useNavigate } from 'react-router';
import { useLayoutEffect, useRef, useState } from 'react';
import UserNameInHeader from './UserNameInHeader';

const isHome = window.location.pathname === '/';

export default function Header({ localId }) {
  const [userArray, setUserArray] = useState(null);
  const [isButtonStyle, setIsButtonStyle] = useState(false);
  const [ulElement, setUlElement] = useState(null);
  const ulRef = useRef(null);

  const keepUlElement = {
    zIndex: '1',
    bottom: '-158%',
    opacity: '1',
  };

  const navigate = useNavigate();

  const handleNavigator = (e) => {
    e.preventDefault();
    if (!localId) {
      alert('아이디를 만들어 주세요');
      navigate('/');
    } else {
      setIsButtonStyle(!isButtonStyle);
      const { user } = localId.users && localId.users;
      setUserArray(user);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsButtonStyle(false);
    }, 200);
  };

  /* useRef 사용시 초기값 null 해결방법 useLayoutEffect()는 동기적으로 실행됨 */
  useLayoutEffect(() => {
    const { current } = ulRef;
    setUlElement(current);
  }, []);
  return (
    <ListPageHeader>
      <HeaderWrap>
        <a href="/">
          <h1>
            <img src="images/logo.svg" alt="로고이미지" style={isHome ? { display: 'none' } : {}} />
          </h1>
        </a>

        <ListPageDiv>
          <GoAskButton type="button" onClick={handleNavigator} onBlur={handleBlur}>
            <span>{isHome ? '질문하러가기' : '답변하러 가기'}</span>
            <img src={isHome ? arrowRight : arrowDown} alt="화살표 이미지" />
          </GoAskButton>
          <ListPageListUl ref={ulRef} style={isOpenList ? { ...keepUlElement } : null}>
            <UserNameInHeader element={ulElement} setIsOpenList={setIsOpenList} user={user} />
          </ListPageListUl>
        </ListPageDiv>
      </HeaderWrap>
    </ListPageHeader>
  );
}

const ListPageDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ListPageListUl = styled.ul`
  position: absolute;
  bottom: -147%;
  right: 50%;
  transform: translate(50%, 50%);
  transition: 0.8s;
  width: 177px;
  text-align: center;
  border: 1px solid #ccc;
  z-index: -1;
  background-color: #fff;
  border-radius: 5px;
  height: 130px;
  overflow: auto;
  cursor: pointer;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: var(--gray30); /* 스크롤바의 색상 */

    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
  }
`;
/* ::-webkit-scrollbar : 스크롤바 영역에 대한 설정
::-webkit-scrollbar-thumb : 스크롤바 막대에 대한 설정
::-webkit-scrollbar-track  : 스크롤바 뒷 배경에 대한 설정 */

const ListPageHeader = styled.header`
  width: 100%;
  max-width: 1004px;
  margin: 0 auto;
  padding: 0 3.2rem;
  @media screen and (${breakPoints.mobile}) {
    max-width: 500px;
    padding: 0 2.4rem;

    & button {
      display: ${isHome ? 'none' : 'block'};
    }
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
  background-color: ${(props) => props.theme.elemBackgroundColor};
  color: var(--brown40);
  font-size: 1.6rem;
  font-weight: 400;
  font-family: Actor;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  span {
    line-height: 1px;
  }
  & img {
    margin-left: 0.8rem;
    width: 18px;
  }
  &:hover {
    overflow: none;
  }

  @media screen and (${breakPoints.mobile}) {
    padding: 0.8rem 1.2rem;
    font-size: 1.4rem;
  }
`;
