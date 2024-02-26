import { styled } from 'styled-components';
import Logo_001 from '../../image/Home/Logo_001.png';

const Banner = (): JSX.Element => {
  return <BannerS src={Logo_001} alt='logo' />;
};

export default Banner;

const BannerS = styled.img`
  width: 8.125rem;
  margin: 7.12rem 0 2rem 0;
  align-self: center;
`;
