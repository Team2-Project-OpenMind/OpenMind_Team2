import ReactPlayer from 'react-player';
import handleExtractVideoId from 'utils/ExtractYoutubeId.js';
import { useState } from 'react';
import * as FC from './FeedCardStyled';
import ButtonForEditorUI from './ButtonForEditorUI';
import AnswerUI from './AnswerUI';

export default function FeedCardContentUI({ question, onPatch, onCreate }) {
  const [isOn, setIsOn] = useState(true);

  const toggleSubmittedReply = () => setIsOn(!isOn);
  const isRejected = question?.answer?.isRejected === true;
  const YOUTUBE_BASE = 'https://www.youtube.com/watch?v=';

  const key = handleExtractVideoId(question?.answer?.content);
  const youtubeURL = YOUTUBE_BASE + key;

  return (
    <FC.ContentAboutAnswer>
      {question?.answer ? (
        <>
          <ButtonForEditorUI
            question={question}
            onPatch={onPatch}
            onToggle={toggleSubmittedReply}
          />
          <FC.AnswerMark>답변 완료</FC.AnswerMark>
          {!isRejected ? (
            <FC.SubmittedAnswer $isDisplay={isOn}>
              {question.answer.content}

              {question.answer.content.includes(YOUTUBE_BASE) && (
                <ReactPlayer url={youtubeURL} muted controls width={'400px'} height={'240px'} />
              )}
            </FC.SubmittedAnswer>
          ) : (
            <FC.AnswerRejected>답변 거절</FC.AnswerRejected>
          )}
        </>
      ) : (
        <>
          <FC.UnAnswerMark>미답변</FC.UnAnswerMark>
          <AnswerUI onCreate={onCreate} question={question} />
        </>
      )}
    </FC.ContentAboutAnswer>
  );
}
