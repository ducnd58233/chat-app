import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast
}
  from '@chakra-ui/react'

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const toast = useToast()
  const history = useNavigate()

  const handleClick = () => setShow(!show)

  const submitHandler = async () => {
    setLoading(true)
    if (!email || !password) {
      toast({
        title: 'Please fill all the Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      setLoading(false)
      return
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
      }

      const { data } = await axios.post('/user/login', {
        email,
        password
      }, config)
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false)
      history.pushState('/chats')
    } catch (err) {
      toast({
        title: 'Error Occured!',
        description: err.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      setLoading(false)
    }
  }

  return (
    <VStack spacing='5px'>
      {/* Email */}
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter Your Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>

      {/* Password */}
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Enter Your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Sign up button */}
      <Button
        colorScheme='blue'
        width='100%'
        style={{ marginTop: 15 }}
        color='white'
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant='solid'
        colorScheme='red'
        width='100%'
        onClick={() => {
          setEmail('guest@example.com')
          setPassword('123456')
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login