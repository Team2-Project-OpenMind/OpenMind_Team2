import styled from 'styled-components';
import arrowRight from '../assets/images/arrow-right.svg';
import arrowDown from '../assets/images/arrow-down.svg';
import { breakPoints } from './common/Media';
import { useNavigate } from 'react-router';
import { useLayoutEffect, useRef, useState } from 'react';
import UserNameInHeader from './UserNameInHeader';

export default function Header({ localId }) {
  const [isOpenList, setIsOpenList] = useState(false);
  const [ulElement, setUlElement] = useState(null);
  const ulRef = useRef(null);
  const { user } = localId.users;

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
    }
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
            <img src="images/logo.svg" alt="로고이미지" />
          </h1>
        </a>
        <ListPageDiv>
          <GoAskButton type="button" onClick={handleNavigator}>
            <span>생성 리스트 보기</span>
            <img src={arrowDown} alt="화살표 이미지" />
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
  width: 190px;
  text-align: center;
  border: 1px solid #ccc;
  z-index: -1;
  opacity: 0;
  background-color: #fff;
  border-radius: 5px;
  height: 130px;
  overflow: auto;
  cursor: pointer;
`;

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
  background-color: var(--brown10);
  color: var(--brown40);
  font-size: 1.6rem;
  font-weight: 400;
  font-family: Actor;
  text-decoration: none;
  overflow: hidden;
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
  &:hover + ${ListPageListUl} {
    z-index: 1;
    bottom: -158%;
    opacity: 1;
  }

  @media screen and (${breakPoints.mobile}) {
    padding: 0.8rem 1.2rem;
    font-size: 1.4rem;
  }
`;
