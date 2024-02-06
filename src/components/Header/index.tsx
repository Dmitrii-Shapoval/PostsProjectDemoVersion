import {
  HeaderWrapper,
  TextWrapper,
  Icon,
  ShadowWrapper,
  styles,
} from './styles.ts';
interface iProps {
  title: string;
}
const Header = ({title}: iProps) => {
  const {shadowContainerStyles, shadowStyles}: any = styles;
  return (
    <ShadowWrapper
      distance={15}
      offset={[0, 2]}
      containerStyle={shadowContainerStyles}
      style={shadowStyles}>
      <HeaderWrapper>
        <Icon icon="envelopes-bulk" size={40} />
        <TextWrapper>{title}</TextWrapper>
      </HeaderWrapper>
    </ShadowWrapper>
  );
};

export default Header;
