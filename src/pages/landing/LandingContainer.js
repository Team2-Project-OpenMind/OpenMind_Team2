import arrowRight from '../../assets/images/arrow-right.svg';
import personImg from '../../assets/images/Person.svg';
import * as style from './LandingStyle';

export default function LandingContainer() {
  return (
    <style.Container>
      <style.GoAskButton>
        질문하러가기
        <img src={arrowRight} alt="" />
      </style.GoAskButton>
      <style.Logo src="/images/logo.svg" alt="로고" />
      <style.Form>
        <style.Input>
          <img src={personImg} alt="" />
          <input type="text" placeholder="이름을 입력하세요"></input>
        </style.Input>
        <style.Button>질문받기</style.Button>
      </style.Form>
      <style.HeroImage></style.HeroImage>
    </style.Container>
  );
}
