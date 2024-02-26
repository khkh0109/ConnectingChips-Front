import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { LoginInput } from './LoginInput';
import { postLogin } from '../../API/login';
import { SignClearBtnS } from '../../StyleComp/SignBtnS';
import { ReactComponent as ArrowRight } from '../../image/Icon/Arrow/Arrow_icon_Right.svg';

type bindValue = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function LoginForm() {
  const navigate = useNavigate();

  const [inputState, setInputState] = useState('default');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const idBind: bindValue = { value: nickname, setValue: setNickname };
  const pwBind: bindValue = { value: password, setValue: setPassword };

  const isDefault = inputState === 'default';

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { accessToken } = await postLogin(nickname, password);
      localStorage.setItem('access_token', accessToken);
      navigate('/');
    } catch (error) {
      console.error('로그인 실패');
      setInputState('failed');
    }
  };

  return (
    <LoginOuterContainerS>
      <LoginFormS onSubmit={handleLoginSubmit}>
        <LoginContainerS>
          <LoginInnerContainerS>
            <LoginInput
              sort='ID'
              isdefault={isDefault}
              inputbind={idBind}
              setInputState={setInputState}
            />
            <LoginInput
              sort='PW'
              isdefault={isDefault}
              inputbind={pwBind}
              setInputState={setInputState}
            />
          </LoginInnerContainerS>
          {!isDefault && <p className='error'>아이디 혹은 비밀번호가 일치하지 않습니다</p>}
        </LoginContainerS>

        <SignClearBtnS type='submit'>로그인</SignClearBtnS>
      </LoginFormS>
      <SignUpLinkS>
        <p>회원이 아니신가요?</p>
        <Link to='/signUp' className='sign-up-link'>
          <span>회원가입</span>
          <ArrowRight />
        </Link>
      </SignUpLinkS>
    </LoginOuterContainerS>
  );
}

/** 2023-08-24 LogIn.tsx - 로그인 / 회원가입 배너 */
const LoginOuterContainerS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`;

/** 2023-08-24 LogIn.tsx - 로그인 입력폼 */
const LoginFormS = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 13.75rem;

  p.error {
    color: var(--system-red);
  }
`;

const LoginContainerS = styled.div`
  height: 9.28438rem;
  margin-bottom: 0.97rem;
`;

/** 2023-08-24 LogIn.tsx - 로그인 입력 컨테이너 */
const LoginInnerContainerS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.47rem;
`;

const SignUpLinkS = styled.div`
  display: flex;
  margin-top: 4.25rem;

  p {
    margin-right: 0.4rem;
    font-size: 0.875rem;
    color: var(--font-color3);
  }

  .sign-up-link {
    font-size: 0.875rem;
  }

  svg {
    width: 0.75rem;
    margin-left: 3px;
  }
`;