import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as S from './CardListStyle';

import CardItem from './CardItem';
import Pagination from 'components/pagination/Pagination';
import { PagePath } from 'context/PathContext';

const BROWSER_WIDTH = window.innerWidth;
const TABLET_SIZE = 865;
const MOBILE_SIZE = 767;

export default function CardList({ data, message, range }) {
  const newLocalDatas = [];
  const { localId, setNewLocalData, setMobileSize } = useContext(PagePath);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(BROWSER_WIDTH >= TABLET_SIZE ? 8 : 6); //한페이지당 렌더링 되는 데이터 수

  useEffect(() => {
    window.addEventListener('resize', (e) => {
      if (e.target.innerWidth >= TABLET_SIZE) {
        setPostPerPage(8);
      } else {
        setPostPerPage(6);
      }
      if (e.target.innerWidth <= MOBILE_SIZE) {
        setMobileSize(true);
      } else {
        setMobileSize(false);
      }
    });
    setNewLocalData(newLocalDatas);
  }, [postsPerPage, data]);

  //페이지숫자 리스트 구현 계산
  const indexOfLast = currentPage * postsPerPage; //페이지 마지막수 1 * 8
  const indexOfFirst = indexOfLast - postsPerPage; // 페이지 첫번째 수8 - 8 = 0

  const currentPosts = (datas) => {
    let currentPosts = datas.slice(indexOfFirst, indexOfLast); //데이터를 0~8번째까지 슬라이스함 인덱스7까지
    return currentPosts;
  };

  if (!data) return;

  const { results } = data;

  if (localId?.users) {
    localId.users.user.map((list) => {
      return results.map((data) => {
        if (list.id === data.id) {
          newLocalDatas.push(data);
        }
      });
    });
  }

  const sortData = results?.sort((a, b) => {
    if (range === '이름순') {
      return a.name > b.name ? 1 : -1;
    } else {
      return a.createdAt > b.createdAt ? -1 : 1;
    }
  });

  const postLists = currentPosts(sortData);

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
