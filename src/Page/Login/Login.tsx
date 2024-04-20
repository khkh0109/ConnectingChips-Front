import { styled } from 'styled-components';

import { GroupHeader, Logo, LoginForm, SignUpLink } from './LoginBarrel';

export default function Login() {
  return (
    <>
      <GroupHeader text='로그인' />
      <ContainerS>
        <Logo mode='dark' width={8.125} />
        <LoginForm />
        <SignUpLink />
      </ContainerS>
    </>
  );
}

const ContainerS = styled.div`
  & > svg {
    margin: 3.125rem auto 2rem;
  }

  width: var(--width-mobile);
  height: 100%;
  padding: 3.5rem 1rem 0;
`;
