import { useState } from 'react';
import * as S from './PaginationStyle';

export default function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = []; //페이지 넘버 배열 설정
  const [togState, setToState] = useState({
    togList: pageNumbers,
  });

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push({ id: i, isDone: false });
  }

  return (
    <>
      <S.ListPagination>
        {togState.togList.map((Num, index) => {
          return (
            <S.ListPaginationNumber key={Num.id} onClick={() => paginate(Num.id)}>
              {Num.id}
            </S.ListPaginationNumber>
          );
        })}
      </S.ListPagination>
    </>
  );
}
