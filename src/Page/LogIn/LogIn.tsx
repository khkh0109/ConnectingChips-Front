import { styled } from 'styled-components';

import { GroupHeader, Banner, LoginForm, SignUpLink } from './LoginBarrel';

export default function LogIn() {
  return (
    <ContainerS>
      <GroupHeader text='로그인' />
      <Banner />
      <LoginForm />
      <SignUpLink />
    </ContainerS>
  );
}

const ContainerS = styled.div`
  display: flex;
  flex-direction: column;
  width: var(--width-mobile);
  height: 100%;
`;
