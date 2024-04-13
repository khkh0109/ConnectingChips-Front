import { styled } from 'styled-components';

import { ReactComponent as LogoLight } from '../image/logo/logo-light.svg';
import { ReactComponent as LogoDark } from '../image/logo/logo-dark.svg';

interface LogoProps {
  mode: 'light' | 'dark';
  width: string;
  padding?: string;
  margin?: string;
}

export default function Logo({ mode, width, padding = '', margin = '' }: LogoProps) {
  const LogoComponent = mode === 'light' ? LogoLight : LogoDark;

  return <LogoS as={LogoComponent} width={width} height='100%' padding={padding} margin={margin} />;
}

const LogoS = styled.svg<{ margin: string; padding: string }>`
  display: block;
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
`;
