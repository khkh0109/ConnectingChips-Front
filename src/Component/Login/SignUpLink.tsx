import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ArrowRight } from '../../image/Icon/Arrow/Arrow_icon_Right.svg';

export default function SignUpLink() {
  return (
    <SignUpLinkS>
      <p>회원이 아니신가요?</p>
      <Link to='/signUp' className='sign-up-link'>
        <span>회원가입</span>
        <ArrowRight />
      </Link>
    </SignUpLinkS>
  );
}

const SignUpLinkS = styled.div`
  display: flex;
  justify-content: center;
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
