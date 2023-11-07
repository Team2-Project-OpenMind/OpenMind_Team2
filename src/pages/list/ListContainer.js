import CardList from 'components/listPageCard/CardList';
import arrowUp from '../../assets/images/arrow-up.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import * as S from './ListStyle';
import { useEffect, useState } from 'react';
import { getAllSubjects } from 'api/api.subjects';

const numberList = ['1', '2', '3', '4', '5', '6', '7', '8'];

export default function ListContainer() {
  const [isDropdownView, setDropdownView] = useState(false);
  const [range, setRange] = useState('');
  const [friends, setFriends] = useState(null);
  const [dataErrorMessage, setDataErrorMessage] = useState('');

  const handleSubjectsData = async () => {
    try {
      const data = await getAllSubjects();
      setFriends(data);
    } catch (error) {
      setDataErrorMessage(error.message);
    }
  };

  useEffect(() => {
    handleSubjectsData();
  }, []);
  console.log(friends);
  const handleClickSelect = () => {
    setDropdownView(!isDropdownView);
  };

  const handleClickList = (e) => {
    const { textContent } = e.target;
    setRange(textContent);
  };

  /* Blur 이벤트 함수 select 포커스 아웃되었을때 반응 */
  const handleBlur = () => {
    setTimeout(() => {
      setDropdownView(false);
    }, 200);
  };

  return (
    <S.ListContainerBox>
      <S.ListWrap>
        <S.ListUpper>
          <S.ListTitle>누구에게 질문할까요?</S.ListTitle>
          <S.Dropdown onBlur={handleBlur}>
            <label onClick={handleClickSelect}>
              <S.DropdownButton $isDropdownView={isDropdownView}>
                <span>{range ? range : '최신순'}</span>
                <img src={isDropdownView ? arrowUp : arrowDown} alt="화살표 이미지"></img>
              </S.DropdownButton>
            </label>
            {isDropdownView && (
              <S.DropdownList>
                <S.DropdownListItme onClick={handleClickList}>이름순</S.DropdownListItme>
                <S.DropdownListItme onClick={handleClickList}>최신순</S.DropdownListItme>
              </S.DropdownList>
            )}
          </S.Dropdown>
        </S.ListUpper>
        <CardList data={friends} message={dataErrorMessage} />
        <S.ListPagination>
          {numberList.map((list, index) => {
            return <S.ListPaginationNumber key={index}>{list}</S.ListPaginationNumber>;
          })}
        </S.ListPagination>
      </S.ListWrap>
    </S.ListContainerBox>
  );
}
