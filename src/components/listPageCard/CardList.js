import { Link } from 'react-router-dom';
import CardItem from './CardItem';
import * as S from './CardListStyle';
import { getPageSubjects } from 'api/api.subjects';
import { useEffect, useState } from 'react';

const numberList = ['1', '2', '3', '4', '5', '6', '7', '8'];

export default function CardList({ data, message }) {
  const [sliceData, setSliceData] = useState(null);

  const handleLinkData = async (length, num) => {
    try {
      const datas = await getPageSubjects(length, num);
      console.log(datas);
      setSliceData(datas);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleLinkData(data?.results.length);
  }, [data]);
  if (!data) return;

  const { results } = data;
  const pageNumbers = []; //페이지 넘버 배열 설정
  //console.log(data.count / results.length);
  for (let i = 1; i <= Math.ceil(data.count / results.length); i++) {
    pageNumbers.push({ id: i, isDone: false });
  }

  return (
    <>
      <S.ListCards>
        {!message ? (
          sliceData?.results.map((li) => {
            return (
              <Link to={`/post/${li.id}`}>
                <CardItem friends={li} />
              </Link>
            );
          })
        ) : (
          <li>{message}</li>
        )}
      </S.ListCards>
      <S.ListPagination>
        {pageNumbers.map((Num, index) => {
          return (
            <S.ListPaginationNumber
              key={Num.id}
              onClick={() => handleLinkData(results.length, index)}
            >
              {Num.id}
            </S.ListPaginationNumber>
          );
        })}
      </S.ListPagination>
    </>
  );
}
