import React, { useRef, useEffect } from 'react'
import { useField } from '@unform/core'
import { Icon } from 'react-native-material-ui'
import { TextInput } from './styles'

const Input = ({ name, iconName, ...rest }) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    inputRef.current.value = defaultValue
  }, [defaultValue])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = ''
        ref.clear()
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value })
        inputRef.current.value = value
      },
      getValue(ref) {
        return ref.value
      },
    })
  }, [fieldName, registerField])
  return (
    <TextInput
      ref={inputRef}
      defaultValue={defaultValue}
      onChangeText={(value) => {
        if (inputRef.current) {
          inputRef.current.value = value
        }
      }}
      leftIcon={
        <Icon
          name={iconName}
          size={24}
          color='#fff'
          style={{ marginRight: 20 }}
        />
      }
      {...rest}
    />
  )
}

export default Input
