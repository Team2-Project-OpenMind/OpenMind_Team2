export default function ListContainer() {
  return (
    <div>
      <div>
        <h2>누구에게 질문할까요?</h2>
        <select>
          <option>이름순</option>
          <option>최신순</option>
        </select>
        <ul>
          <li>
            <img src="/images/profile.svg" />
            <h4>아초는 고양이</h4>
            <div></div>
          </li>
        </ul>
      </div>
    </div>
  );
}
