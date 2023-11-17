### Codeit-Sprint FE 1기 - Part2 Project

<br>

<div align="center">
  <h1>💌 Open-Mind</h1> 
  <p>질문과 답변을 통해 마음을 열고 대화 나누는 소통 플랫폼인 '오픈마인드'를 개발하였습니다.</p>
</div>

<br>

### 🕰️ 개발 기간

23.11.03 - 23.11.17

<br>

### 💫 팀원 소개

|이름|이미지|
|:----------:|:---------------------------------:|
|[박소현](https://github.com/ParkSohyunee)|
|[안유진](https://github.com/Eugene-A-01)|
|[남민섭](https://github.com/namminimi)|
|[강나현](https://github.com/Nahyun-Kang)|
|[고민혁](https://github.com/minhyeokG0)|

<br>

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  * [Team Rules](#team-rules)
  * [Tech Stack](#space_invader-tech-stack)
  * [Features](#dart-features)
- [Getting Started](#toolbox-getting-started)
- [Usage](#eyes-usage)

<br/>

<!-- About the Project -->
## :star2: About the Project

<!-- Team Rules -->
### Team Rules
- <a href="https://github.com/Nahyunfirstorganization/OpenMind_Team2/wiki/Team-Formatting-Rules" >Team Formatting Rules 상세보기</a>
- <a href="https://github.com/Nahyunfirstorganization/OpenMind_Team2/wiki/Team-Rules" >Team Rules 상세보기</a>

<br/>

<!-- TechStack -->
### :space_invader: Tech Stack
- Frontend 기술 스택
- 라이브러리
- 백엔드 API
- 배포

<br/>

<!-- Features -->
### :dart: Features

- 로그인
- 질문 생성, 조회, 삭제
- 답변 생성, 조회, 수정, 삭제
- 질문 목록 조회, 페이지네이션
- SNS 공유 기능, 링크 복사 기능
- 다크 모드 테마
- BGM 기능
- 유튜브 임베드 기능

<br/>

<!-- Getting Started -->
## 	:toolbox: Getting Started

```
$ git clone https://github.com/Team2-Project-OpenMind/OpenMind_Team2.git

$ npm install

$ npm start

# http://localhost:3000 접속
```

<br/>

> 🌐 배포주소 https://open-mind-team2.vercel.app/ <br/>

<br/>

<!-- Usage -->
## :eyes: Usage

<!-- 기획요구사항 

## 기획 요구 사항

### 1. 메인 페이지(`/`) <a href="https://github.com/Nahyunfirstorganization/OpenMind_Team2/wiki/%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C1(%EB%A9%94%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80)" >상세보기 - WIKI 이동</a>

<details><summary>요구사항 보기</summary>

- 이름을 입력하고 '질문 받기' 버튼을 클릭하면 피드 생성 요청으로 피드를 생성합니다.
- 피드 생성 응답을 받으면 응답으로 받은 피드 id를 활용해 `/post/{id}/answer` 페이지로 이동합니다.
</details>

### 2. 질문 목록 페이지(`/list`) <a href="https://github.com/Nahyunfirstorganization/OpenMind_Team2/wiki/%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C2(%EC%A7%88%EB%AC%B8-%EB%AA%A9%EB%A1%9D-%ED%8E%98%EC%9D%B4%EC%A7%80)" >상세보기 - WIKI 이동</a>

<details><summary>요구사항 보기</summary>

- 오픈마인드 로고를 클릭하면 `/` 페이지로 이동합니다.
- 현재 페이지, 정렬 순서를 설정해서 카드 리스트 조회 요청합니다.(기본 정렬 순서는 '최신순')
- '답변하러 가기' 버튼을 클릭 시, 질문 받기로 생성한 id가 로컬 스토리지에 없으면 메인 페이지(`/`)로 이동하고, 있으면 `/post/{id}/answer` 페이지로 이동합니다.
- PC에서 너비가 1200px 보다 커질 경우 내부 내용의 위치는 고정하고 좌우 여백만 커집니다.
- PC에서 카드 컴포넌트의 너비는 220px 입니다.
- Tablet에서 상단 네비게이션 영역의 좌우 여백은 50px을 유지해주세요.
- Tablet에서 카드 리스트 영역의 좌우 최소 여백은 32px 입니다.
- Tablet에서 카드 컴포넌트의 최소 너비는 186px 입니다.
- Tablet에서 카드 리스트 영역이 줄어드는 것에 따라 카드 크기가 작아지다가 186px보다 작아질 때 하나의 행에 4개 → 3개씩 보이도록 합니다.
- Mobile에서 '누구에게 질문할까요?'는 좌측 여백 24px과 정렬 드롭 다운은 우측 여백 24px을
  유지하며 둘 사이의 간격이 멀어집니다.
- Mobile에서 카드 리스트 영역의 좌우 최소 여백은 24px 입니다.
</details>

### 3. 개별 피드( `/post/{id}`) <a href="https://github.com/Nahyunfirstorganization/OpenMind_Team2/wiki/%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C3(%EA%B0%9C%EB%B3%84-%ED%94%BC%EB%93%9C)" >상세보기 - WIKI 이동</a>

<details><summary>요구사항 보기</summary>

- 답변이 완료된 질문은 '답변완료'로 표시해주세요.
- 답변이 완료된 질문에는 '수정하기'와 '삭제하기' 버튼이 생깁니다.
- 답변이 완료되지 않은 질문은 '미답변'으로 표시해주세요.
- 답변거절 버튼을 누르면 ‘답변거절’로 입력이 됩니다
- 질문이 없는 경우 'No_question 화면'이 보입니다.('아직 질문이 없습니다' 텍스트 보여주기)
- '질문 작성하기' 버튼을 클릭하면 '질문을 작성하세요' 모달이 뜹니다.
- 질문은 '최신순'으로 무한 스크롤 방식으로 배치합니다.
- '…'을 누르면 삭제하기 버튼이 나타나고 누르면 해당 질문이 삭제됩니다.
- '링크 아이콘'을 클릭하면 URL을 클립보드에 복사하고, 'URL이 복사되었습니다' 토스트가 5초 동안 보이다가 사라집니다.
- '카카오 아이콘'을 클릭하면 카카오톡으로 공유하는 화면이 보입니다.
- '페이스북 아이콘'을 클릭하면 페이스북으로 공유하는 화면이 보입니다.
- 좋아요, 싫어요 개수를 표시합니다.
</details>

### 4. 개별 피드에 대한 질문하기 모달창( `/post/{id}`) <a href="https://github.com/Nahyunfirstorganization/OpenMind_Team2/wiki/%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C4(%EA%B0%9C%EB%B3%84-%ED%94%BC%EB%93%9C%EC%97%90-%EB%8C%80%ED%95%9C-%EC%A7%88%EB%AC%B8%ED%95%98%EA%B8%B0-%EB%AA%A8%EB%8B%AC%EC%B0%BD)" >상세보기 - WIKI 이동</a>

<details><summary>요구사항 보기</summary>
- 모달의 'X' 버튼이나 모달 내용을 벗어난 부분을 클릭하면 모달을 닫습니다.
- 모달에 질문 내용이 없는 경우 '질문 보내기' 버튼은 비활성화 상태입니다. 질문 내용이 있는 경우 활성화 됩니다.
</details>

### 5. 답변하기 (`/post/{id}/answer`) <a href="https://github.com/Nahyunfirstorganization/OpenMind_Team2/wiki/%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C5(%EB%8B%B5%EB%B3%80%ED%95%98%EA%B8%B0)" >상세보기 - WIKI 이동</a>

<details><summary>요구사항 보기</summary>
- 답변이 입력되면 '답변 완료' 버튼이 활성화가 됩니다.
- 답변이 완료된 질문에 '수정하기' 버튼을 누르면 해당 질문칸은 수정이 가능한 질문칸으로 변경이 됩니다.
- 수정할 내용이 없으면 '수정완료' 버튼은 활성화 되지 않습니다.
- 화면 최상단의 '삭제하기' 버튼을 누르면 받은 질문들과 피드가 한 번에 삭제가 됩니다.
</details>

-->
