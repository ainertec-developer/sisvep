import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useRef } from 'react';
import { AsyncStorage, KeyboardAvoidingView } from 'react-native';
import * as Yup from 'yup';
import { Button, Input, Label } from '../../components/Form';
import QrReader from '../../components/QrReader';
import api from '../../services/api';
import { Container, Scroll } from './styles';

export default function Setting() {
  const formRef = useRef(null);
  const navigation = useNavigation();

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        ipAddress: Yup.string().required('O ip é obrigatório.'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      api.defaults.baseURL = `http://${data.ipAddress}:3333`;
      await AsyncStorage.setItem('@RN:ip', data.ipAddress);

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        formRef.current.setErrors(errorMessages);
      }
    }
  }

  useEffect(() => {
    async function loadIpAddress() {
      const ipAddress = await AsyncStorage.getItem('@RN:ip');
      // const ipAddress = api.defaults.baseURL;

      formRef.current.setData({ ipAddress });
    }
    loadIpAddress();
  }, []);

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior='height'
        enable
        keyboardVerticalOffset={100}
      >
        <Scroll>
          <QrReader
            formRef={formRef}
            cameraSide
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Label>Endereço ip:</Label>
            <Input
              name='ipAddress'
              iconName='leak-add'
              placeholder='Digite endereço ip'
            />
            <Button onPress={() => formRef.current.submitForm()} />
          </Form>
        </Scroll>
      </KeyboardAvoidingView>
    </Container>
  );
}
