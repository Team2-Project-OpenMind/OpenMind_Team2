import { EditorButton } from './FeedCardStyled';
import editor from '../../assets/images/Edit.svg';
export default function ButtonForEditorUI({ onOpen }) {
  return (
    <EditorButton onClick={() => onOpen()}>
      <img src={editor} alt="수정하기" />
      수정하기
    </EditorButton>
  );
}
