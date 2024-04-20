import { styled } from 'styled-components';

import { ReactComponent as LogoLight } from '../image/logo/logo-light.svg';
import { ReactComponent as LogoDark } from '../image/logo/logo-dark.svg';

interface LogoProps {
  mode: 'light' | 'dark';
  width: string;
}

export default function Logo({ mode, width }: LogoProps) {
  const LogoComponent = mode === 'light' ? LogoLight : LogoDark;

  return <LogoS as={LogoComponent} width={width} height='100%' />;
}

const LogoS = styled.svg`
  display: block;
`;
