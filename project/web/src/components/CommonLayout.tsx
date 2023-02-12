import { BackgroundProps, Box } from '@chakra-ui/react'
import Navbar from './nav/Navbar'

interface CommonLayoutProps {
  children: React.ReactNode
  bg?: BackgroundProps['bg']
}

export default function CommonLayout({ children, bg }: CommonLayoutProps) {
  return (
    <div>
      <Navbar />
      <Box px={{ base: 4 }} pt={24} mx="auto" maxW="960px" minH="100vh" w="100%" bg={bg}>
        {children}
      </Box>
    </div>
  )
}
