import { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { LocalIdContext } from 'context/LocalIdContext';
import { breakPoints } from './common/Media';

export default function UserNameInHeader({ user, count }) {
  const context = useContext(LocalIdContext);
  const { setLocalId } = context;

  const useLocalIdContext = useCallback(
    (e) => {
      const nextLocalId = e.currentTarget.getAttribute('value');
      setLocalId(nextLocalId);
      window.localStorage.setItem('id', nextLocalId);
    },
    [setLocalId],
  );

  const disablePointer = { pointerEvents: 'none' };

  return (
    <>
      {user.map((name, index) => {
        return (
          <ListPageListLi key={name.id} value={name.id} onClick={useLocalIdContext}>
            <Link to={`/post/${name?.id}/answer`}>
              <h5 style={disablePointer}>{name.name}</h5>
              <span style={disablePointer}>받은질문 {count[index]?.questionCount}개</span>
            </Link>
          </ListPageListLi>
        );
      })}
    </>
  );
}

const ListPageListLi = styled.li`
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    padding: 0 15px;
    color: var(--gray50);
    text-decoration: none;

    h5 {
      width: 56px;
      font-size: 1.3rem;
      line-height: 16px;
    }

    &:hover {
      color: var(--blue50);
    }
  }
  @media screen and (${breakPoints.mobile}) {
    a {
      padding: 0 5px;
    }
    h5 {
      font-size: 1.2rem;
    }
  }
`;
