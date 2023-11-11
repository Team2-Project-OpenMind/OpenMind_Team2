import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function UserNameInHeader({ element, setIsOpenList, user }) {
  element?.addEventListener('mouseover', () => {
    setIsOpenList(true);
  });

  element?.addEventListener('mouseout', () => {
    setIsOpenList(false);
  });
  return (
    <>
      {user.map((name) => {
        return (
          <ListPageListLi key={name.id}>
            <Link to={`/post/${name.id}/answer`}>
              <h5>{name.name}</h5>
              <span>받은질문 5개</span>
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
    padding: 0 20px;
    height: 32px;
    text-decoration: none;
    color: #000;
    h5 {
      font-size: 1.3rem;
      width: 56px;
      line-height: 16px;
    }
    &:hover {
      color: #fff;
    }
  }
  &:hover {
    background-color: var(--blue50);
  }
`;
