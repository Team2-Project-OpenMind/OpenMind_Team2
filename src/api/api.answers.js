import { BASE_URL } from './domain';

const headers = { 'Content-Type': 'application/json; charset=utf-8' };

// 1. GET 요청

// 특정 답변 조회
export async function getAnswers(answerId) {
  const res = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    headers,
  });

  if (!res) {
    throw new Error('에러가 발생했습니다.');
  }
  const data = await res.json();
  return data;
}

// 2. PUT 요청

// 특정 답변 수정
export async function updateAnswers(answerId, answerData) {
  const res = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(answerData),
  });

  if (!res) {
    throw new Error('에러가 발생했습니다.');
  }
  const data = await res.json();
  return data;
}

// 3. PATCH 요청

// 특정 답변 일부 수정
export async function updateAnswersPartial(answerId, answerData) {
  const res = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(answerData),
  });

  if (!res) {
    throw new Error('에러가 발생했습니다.');
  }
  const data = await res.json();
  return data;
}

// 4. DELETE 요청

// 특정 답변 삭제
export async function deleteAnswers(answerId) {
  const res = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: 'DELETE',
    headers,
  });

  if (!res) {
    throw new Error('에러가 발생했습니다.');
  }
}
