import { Fragment, useEffect, useState } from 'react';
import * as S from './PaginationStyle';

export default function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = []; //페이지 넘버 배열 설정
  const [numberList, setNumberListState] = useState({
    numberBox: pageNumbers,
  });

  useEffect(() => {
    setNumberListState({
      numberBox: pageNumbers,
    });
  }, [postsPerPage, currentPage]);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    if (i === currentPage) {
      pageNumbers.push({ id: i, isDone: true });
    } else {
      pageNumbers.push({ id: i, isDone: false });
    }
  }

  const onNumberToggle = (id) => {
    const newNumberList = numberList.numberBox.map((num) =>
      num.id === id
        ? {
            ...num,
            isDone: !num.isDone,
          }
        : num.id !== id && num.isDone === true
        ? {
            ...num,
            isDone: !num.isDone,
          }
        : num,
    );

    setNumberListState({
      ...numberList,
      numberBox: newNumberList,
    });
  };
  /* 번호배열 길이 -2 보다 현재페이지 번호가 작으면 ... 제거 */
  const islastHellip = () => {
    return currentPage <= numberList.numberBox.length - 3;
  };
  /* 4 보다 현재페이지 번호가 작으면 ... 제거(첫 화면에서 번호 4까지는 보이기 떄문에 4를 조건으로 줬음 ) */
  const isFirstHellip = () => {
    return currentPage >= 4;
  };

  /* 1번과 마지막번호 고정 활성화 */
  const isFixedNumber = (num) => {
    return num === 1 || num === numberList.numberBox.length;
  };
  /*  현재페이지 +1 보다 각 num값이 큰번호거나 현재페이지 -1 보다 num 작을 때 번호 활성화*/
  /* 첫번째 조건 currentPage + 1 = 6일때 (5페이지일때임)
  1, 2, 3, 4, 5, 6, 7, 8 ,9
  f  f  f  f  f  f  t  t  t
  두번째 조건 currentPage - 1 = 4일때
  1, 2, 3, 4, 5, 6, 7, 8, 9
  t  t  t  f  f  f  f  f  f
  이 조건을 반대로 하면
  첫번째 조건 currentPage + 1 = 6일때 (5페이지일때임)
  1, 2, 3, 4, 5, 6, 7, 8 ,9
  t  t  t  t  t  t  f  f  f
  두번째 조건 currentPage - 1 = 4일때
  1, 2, 3, 4, 5, 6, 7, 8, 9
  f  f  f  t  t  t  t  t  t
  이 두 조건을 겹쳤을떄 t 인 부분만 활성화(범위 조절이 필요시 숫자 변경하고 isNoneNumChange도 같이 숫자 변경해야함) */
  const isNoneNumber = (num) => {
    return currentPage + 1 < num || currentPage - 1 > num;
  };
  /* 번호 1과 마지막번호가 가까워졌을때 현재 화면에 랜더링된 번호 유지(페이지만 이동되게) */
  const isNoneNumChange = (num) => {
    return (
      (currentPage === 2 && currentPage + 3 > num) ||
      (currentPage === numberList.numberBox.length - 1 && currentPage - 3 < num) ||
      (currentPage === 1 && currentPage + 4 > num) ||
      (currentPage === numberList.numberBox.length && currentPage - 4 < num)
    );
  };

  return (
    <>
      <S.ListPagination>
        {numberList.numberBox.map((num, index) => {
          return (
            <Fragment key={index}>
              {num.id === numberList.numberBox.length && islastHellip() ? (
                <S.ListPaginationHellip className="hellip">&hellip;</S.ListPaginationHellip>
              ) : null}
              {num.id === 2 && isFirstHellip() ? (
                <S.ListPaginationHellip className="hellip">&hellip;</S.ListPaginationHellip>
              ) : null}
              <S.ListPaginationNumber
                key={num.id}
                style={{
                  color: num.isDone ? 'var(--brown40)' : 'var(--gray40)',
                  display:
                    !isNoneNumber(num.id) || isFixedNumber(num.id) || isNoneNumChange(num.id)
                      ? 'flex'
                      : 'none',
                }}
                onClick={() => {
                  onNumberToggle(num.id);
                  paginate(num.id);
                }}
              >
                {num.id}
              </S.ListPaginationNumber>
            </Fragment>
          );
        })}
      </S.ListPagination>
    </>
  );
}
