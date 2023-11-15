import { styled } from 'styled-components';
import { useTheme } from 'context/ThemeProvider';
import { breakPoints } from './common/Media';

export default function ThemeToggleButton() {
  const { themeMode, toggleTheme } = useTheme();

  return <Button onClick={toggleTheme}>{themeMode === 'light' ? '☀️' : '🌙'}</Button>;
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
  left: 3rem;

  font-size: 2rem;

  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 50%;
  cursor: pointer;

  @media screen and (${breakPoints.mobile}) {
    width: 2rem;
    height: 2rem;
    bottom: 1.5rem;
    left: 1.5rem;
    font-size: 1rem;
  }
`;
