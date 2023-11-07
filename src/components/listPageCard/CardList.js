import CardItem from './CardItem';
import * as style from './CardListStyle';

const list = [1, 2, 3, 4, 5, 6];

export default function CardList() {
  return (
    <style.ListCards>
      {list.map((li, index) => {
        return <CardItem keys={li} />;
      })}
    </style.ListCards>
  );
}
