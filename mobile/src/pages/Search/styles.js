import styled from 'styled-components/native'
import { Animated } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Form } from '@unform/mobile'

export const Container = styled.View`
  flex: 1;
  background: #222;
`

export const List = styled(Animated.FlatList)`
  padding-top: 80px;
`
export const ListFooter = styled.View`
  padding-bottom: 80px;
`
export const Item = styled(ListItem).attrs({
  containerStyle: {
    borderRadius: 8,
    backgroundColor: '#6a1220',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  titleStyle: { color: '#fff' },
  subtitleStyle: { color: '#fff', paddingTop: 10, paddingBottom: 0 },
})`
  color: #fff;
`
export const FormContent = styled(Form)`
  flex: 1;
  background: red;
`
export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  margin-top: 20px;
  text-align: center;
`
