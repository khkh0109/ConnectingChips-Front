import { styled } from 'styled-components';

import { GroupHeader, Banner, LoginForm } from './LoginBarrel';

const LogIn = () => {
  return (
    <ContainerS>
      <GroupHeader text='로그인' />
      <Banner />
      <LoginForm />
    </ContainerS>
  );
};

export default LogIn;

const ContainerS = styled.div`
  width: var(--width-mobile);
  height: 100%;
  display: flex;
  flex-direction: column;
`;
