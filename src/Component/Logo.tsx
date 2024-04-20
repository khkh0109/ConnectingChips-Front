import { styled } from 'styled-components';

import { ReactComponent as LogoLight } from '../image/logo/logo-light.svg';
import { ReactComponent as LogoDark } from '../image/logo/logo-dark.svg';

interface LogoProps {
  mode: 'light' | 'dark';
  /** width는 rem 단위 입니다. */
  width: number;
}

export default function Logo({ mode, width }: LogoProps) {
  const LogoComponent = mode === 'light' ? LogoLight : LogoDark;

  return <LogoS as={LogoComponent} width={`${width}rem`} height='100%' />;
}

const LogoS = styled.svg`
  display: block;
`;
