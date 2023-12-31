import { BASE_URL } from './domain';

const headers = { 'Content-Type': 'application/json; charset=utf-8' };

// 1. GET 요청

// 특정 질문 조회(질문에 대한 답변 포함)
export async function getQuestions(questionId) {
  const res = await fetch(`${BASE_URL}/questions/${questionId}/`, {
    headers,
  });

  if (!res) {
    throw new Error('에러가 발생했습니다.');
  }
  const data = await res.json();
  return data;
}

// 2. POST 요청

// 특정 질문에 대한 좋아요/싫어요
export async function createReaction(questionId, reactionType) {
  const res = await fetch(`${BASE_URL}/questions/${questionId}/reaction/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ type: reactionType }),
  });

  if (!res) {
    throw new Error('에러가 발생했습니다.');
  }
  const data = await res.json();
  return data;
}

// 특정 질문에 대한 답변 작성하기
// 이미 답변이 존재하는 경우, 해당 메세지가 들어있는 객체를 return해 줌(참고)
export async function createAnswer(questionId, answerData) {
  const res = await fetch(`${BASE_URL}/questions/${questionId}/answers/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(answerData),
  });

  if (!res) {
    throw new Error('에러가 발생했습니다.');
  }

  const data = await res.json();
  return data;
}

// 3. DELETE 요청

// 특정 질문 삭제하기
export async function deleteQuestion(questionId) {
  const res = await fetch(`${BASE_URL}/questions/${questionId}/`, {
    method: 'DELETE',
    headers,
  });

  if (!res) {
    throw new Error('에러가 발생했습니다.');
  }
}
