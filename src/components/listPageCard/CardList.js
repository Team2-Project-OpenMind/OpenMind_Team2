import CardItem from './CardItem';
import * as S from './CardListStyle';

export default function CardList({ data, message }) {
  if (!data) return;
  const { results } = data;
  return (
    <S.ListCards>
      {!message ? (
        results.map((li) => {
          return <CardItem friends={li} />;
        })
      ) : (
        <li>{message}</li>
      )}
    </S.ListCards>
  );
}
