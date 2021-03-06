import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Label = styled.Text`
  color: ${(props) => props.theme.colors.text};
  margin-top: ${height * 0.05}px;
`;

export const TextInput = styled(Input).attrs((props) => ({
  containerStyle: {
    backgroundColor: props.theme.colors.background,
  },
  inputStyle: { color: props.theme.colors.text },
}))``;
export const Touchable = styled.TouchableOpacity`
  margin-top: ${height * 0.01}px;
  width: 100%;
  height: ${height * 0.05}px;
  border-radius: 20px;
  border-width: 1px;
  border-width: ${(props) => (props.outline ? 1 : 0)}px;
  border-color: ${(props) => props.theme.colors.primary};
  background: ${(props) =>
    !props.outline
      ? props.theme.colors.primary
      : props.theme.colors.background};
  align-items: center;
  justify-content: center;
  margin-bottom: ${height * 0.024}px;
`;
export const TouchableText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-weight: bold;
`;
export const DatePickerCustom = styled(DateTimePicker)`
  background: ${(props) => props.theme.colors.background};
  width: 100%;
`;

export const PickerView = styled.View`
  background: ${(props) => props.theme.colors.background};
  border-bottom-width: 1px;
  border-bottom-color: rgba(250, 250, 250, 0.7);
  margin: 0 ${width * 0.02}px;
  margin-top: 10px;
  height: ${height * 0.057}px;
  justify-content: space-between;
`;
export const Picker = styled.Picker`
  color: ${(props) => props.theme.colors.text};
  margin-left: ${width * 0.02}px;
`;
export const PickerTitle = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
`;
export const Search = styled(Searchbar)`
  border-radius: ${width * 0.06}px;
  z-index: 2;
  margin: ${height * 0.02}px ${height * 0.01}px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
`;
