import { styled } from 'styled-components';
import { useTheme } from 'context/ThemeProvider';

export default function ThemeToggleButton() {
  const { themeMode, toggleTheme } = useTheme();

  return <Button onClick={toggleTheme}>{themeMode === 'light' ? '☀️' : '🌙'}</Button>;
}

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;

  position: fixed;
  z-index: 1;
  bottom: 2%;
  left: 2%;

  font-size: 2rem;

  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 50%;
  cursor: pointer;
`;
