import CardList from 'components/listPageCard/CardList';
import * as style from './ListStyle';

const numberList = ['1', '2', '3', '4', '5', '6', '7', '8'];

export default function ListContainer() {
  return (
    <style.ListContainerBox>
      <style.ListWrap>
        <style.ListUpper>
          <style.ListTitle>누구에게 질문할까요?</style.ListTitle>
          <style.ListSelect>
            <style.ListOption>이름순</style.ListOption>
            <style.ListOption>최신순</style.ListOption>
          </style.ListSelect>
        </style.ListUpper>
        <CardList />
        <style.ListPagination>
          {numberList.map((list, index) => {
            return <style.ListPaginationNumber key={index}>{list}</style.ListPaginationNumber>;
          })}
        </style.ListPagination>
      </style.ListWrap>
    </style.ListContainerBox>
  );
}
