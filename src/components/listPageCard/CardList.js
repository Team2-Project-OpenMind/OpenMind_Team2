import { Link } from 'react-router-dom';
import CardItem from './CardItem';
import * as S from './CardListStyle';
import { useEffect, useState } from 'react';
import Pagination from 'components/pagination/Pagination';

const BROWSER_WIDTH = window.innerWidth;
const TABLET_SIZE = 865;

export default function CardList({ data, message, range }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(BROWSER_WIDTH >= TABLET_SIZE ? 8 : 6); //한페이지당 렌더링 되는 데이터 수

  useEffect(() => {
    window.addEventListener('resize', (e) => {
      if (e.target.innerWidth >= TABLET_SIZE) {
        setPostPerPage(8);
      } else {
        setPostPerPage(6);
      }
    });
  }, [postsPerPage]);

  //페이지숫자 리스트 구현 계산
  const indexOfLast = currentPage * postsPerPage; //페이지 마지막수 1 * 8
  const indexOfFirst = indexOfLast - postsPerPage; // 페이지 첫번째 수8 - 8 = 0

  const currentPosts = (datas) => {
    let currentPosts = datas.slice(indexOfFirst, indexOfLast); //데이터를 0~8번째까지 슬라이스함 인덱스7까지
    return currentPosts;
  };

  if (!data) return;

  const { results } = data;

  const sortData = results.sort((a, b) => {
    if (range === '이름순') {
      return a.name > b.name ? 1 : -1;
    } else {
      return a.createdAt > b.createdAt ? -1 : 1;
    }
  });

  const postLists = currentPosts(sortData); //위 조건문 통과 후에 페이징 슬라이스

  return (
    <>
      <S.ListCards>
        {!message ? (
          postLists.map((li) => {
            return (
              <Link to={`/post/${li.id}`} key={li.id}>
                <CardItem friends={li} />
              </Link>
            );
          })
        ) : (
          <li>{message}</li>
        )}
      </S.ListCards>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.results.length}
        paginate={setCurrentPage}
        isDone={false}
        currentPage={currentPage}
      />
    </>
  );
}
