import { useRef, useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { breakPoints } from './common/Media';

import BGM from 'assets/music/bgm.mp3';
import PLAY_IMG from 'assets/images/play.png';
import PAUSE_IMG from 'assets/images/pause.png';

export default function BGMbutton() {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleBGMClick = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play();
      return;
    }
    audioRef.current.pause();
  };

  return (
    <Button onClick={handleBGMClick}>
      {isPlaying ? <img src={PAUSE_IMG} alt="" /> : <img src={PLAY_IMG} alt="" />}
      <audio ref={audioRef} autoPlay={true} loop type="audio/mp3" src={BGM}></audio>
    </Button>
  );
}

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;

  position: fixed;
  z-index: 1;
  bottom: 3rem;
  left: 8rem;

  font-size: 2rem;
  & img {
    width: 2rem;
    height: 2rem;
  }

  background-color: var(--gray20);
  border-radius: 50%;
  cursor: pointer;

  @media screen and (${breakPoints.mobile}) {
    width: 2rem;
    height: 2rem;
    bottom: 1.5rem;
    left: 4rem;
    font-size: 1rem;
    & img {
      width: 1rem;
      height: 1rem;
    }
  }
`;
