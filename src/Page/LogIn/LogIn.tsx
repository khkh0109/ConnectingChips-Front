import { styled } from 'styled-components';

import { GroupHeader, Logo, LoginForm, SignUpLink } from './LoginBarrel';

export default function LogIn() {
  return (
    <>
      <GroupHeader text='로그인' />
      <ContainerS>
        <Logo mode='dark' width='8.125rem' />
        <LoginForm />
        <SignUpLink />
      </ContainerS>
    </>
  );
}

const ContainerS = styled.div`
  box-sizing: border-box;
  width: var(--width-mobile);
  height: 100%;
  padding: 6.625rem 1rem 0;
`;
