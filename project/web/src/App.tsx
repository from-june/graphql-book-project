import * as React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from './apollo/createApolloClient'
import Main from './pages/Main'

const apolloClient = createApolloClient()

export const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </ApolloProvider>
)
