import LogIn from 'components/Login';
import * as style from './LandingStyle';
import arrowRight from '../../assets/images/arrow-right.svg';
import { useContext, useEffect } from 'react';
import { PagePath } from 'context/PathContext';

export default function LandingContainer() {
  const { setIsPath } = useContext(PagePath);
  useEffect(()=>{
    setIsPath(false);
  },[])
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
