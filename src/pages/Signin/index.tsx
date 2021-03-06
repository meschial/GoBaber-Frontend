import React, {useRef, useCallback } from 'react'
import { FiLogIn, FiMail,FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/AuthContext'
import getValidationErrors from '../../utils/getValidationsErrors'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background } from './styles'

interface SignInFormData{
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useAuth()

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
    try{
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string()
        .required('E-Mail Obrigatório')
        .email('Digite um E-Mail valido'),
        password: Yup.string()
        .required('Senha é obrigatoria')
      })

      await schema.validate(data, {
        abortEarly: false,
      })
      
      signIn({
        email: data.email,
        password: data.password,
      })
    }catch(err){
      const errors = getValidationErrors(err)
      formRef.current?.setErrors(errors)
    }
  }, [signIn])

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBaber"/>
  
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
  
          <Input name="email" icon={FiMail} placeholder="E-Mail"/>
          <Input name="password" icon={FiLock}  type="password" placeholder="Senha"/>
  
          <Button type="submit">Entrar</Button>
  
          <a href="forgot">Esqueci minha senha</a>
        </Form>
  
        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
  
      <Background />
    </Container>
  )
}

export default SignIn