import LogIn from 'components/Login';
import * as style from './LandingStyle';
import arrowRight from '../../assets/images/arrow-right.svg';

export default function LandingContainer() {
  return (
    <style.Container>
      <style.Logo alt="로고" />
      <style.MobileGoAskButton href="/list">
        질문하러가기
        <img src={arrowRight} alt="" />
      </style.MobileGoAskButton>
      <LogIn />
      <style.HeroImage></style.HeroImage>
    </style.Container>
  );
}
