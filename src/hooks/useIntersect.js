import { useEffect, useRef } from 'react';

/**
 * Observer API를 사용하여 요소를 감지하는 커스텀 hook 입니다.
 * 무한스크롤에서 사용할 수 있습니다.
 *
 * @param {function} callback - intersection이 발생했을 때 호툴되는 콜백함수
 * @param {boolean} hasNext - 불러올 페이지가 있는지 여부, callback 함수 호출 여부를 결정하는 값
 * @returns target 요소에 전달할 ref 값
 */

const options = {
  root: null,
  rootMain: '0px',
  threshold: 1, // 단계별 콜백함수 호출
};

const useIntersect = (callback, hasNext) => {
  const target = useRef(null);

  useEffect(() => {
    if (!target.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNext) {
        console.log('옵져버 실행중'); // 삭제예정
        callback(entries[0]);
      }
    }, options);

    if (target.current) {
      observer.observe(target.current);
    }

    // clean up
    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [target, hasNext, callback]);

  return target;
};

export default useIntersect;
