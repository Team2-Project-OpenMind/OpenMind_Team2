/**
 * subjects: 유저에 대한 api 입니다.
 */

import { BASE_URL } from './domain';

const headers = { 'Content-Type': 'application/json; charset=utf-8' };

// 1. GET 요청

// 전체 유저 조회
export async function getAllSubjects() {
  const res = await fetch(`${BASE_URL}/subjects/?limit=9999`, {
    headers,
  });

  if (!res.ok) {
    throw new Error('에러가 발생했습니다.');
  }
  const data = await res.json();
  return data;
}

// 특정 유저 조회 => user를 생성해서 얻은 id
export async function getSubject(userId) {
  const res = await fetch(`${BASE_URL}/subjects/${userId}/`, {
    headers,
  });

  if (!res.ok) {
    throw new Error('에러가 발생했습니다.');
  }
  const data = await res.json();
  return data;
}

// 특정 유저의 질문목록
export async function getSubjectsOnQuestions(userId) {
  const res = await fetch(`${BASE_URL}/subjects/${userId}/questions/`, {
    headers,
  });

  if (!res.ok) {
    throw new Error('에러가 발생했습니다.');
  }
  const data = await res.json();
  return data;
}

// 2. POST 요청

// 유저 생성
// 참고 - body에 프로퍼티 중 team을 넣지 않아도 정상 등록
export async function createSubject(userData) {
  const res = await fetch(`${BASE_URL}/subjects/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error('에러가 발생했습니다.');
  }
  const data = await res.json();
  return data;
}

// 질문 생성 => 이후, 특정 유저의 질문목록에 보여짐
export async function createQuestions(userId, questionsData) {
  const res = await fetch(`${BASE_URL}/subjects/${userId}/questions/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(questionsData),
  });

  if (!res.ok) {
    throw new Error('에러가 발생했습니다.');
  }
  const data = await res.json();
  return data;
}

// 3. DELETE 요청

// 특정 유저 삭제
export async function deleteSubject(userId) {
  const res = await fetch(`${BASE_URL}/subjects/${userId}/`, {
    method: 'DELETE',
    headers,
  });

  if (!res.ok) {
    throw new Error('에러가 발생했습니다.');
  }
}
