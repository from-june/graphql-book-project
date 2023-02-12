import { BackgroundProps, Box, Flex } from '@chakra-ui/react'

interface CommonLayoutProps {
  children: React.ReactNode
  bg?: BackgroundProps['bg']
}

export default function CommonLayout({ children, bg }: CommonLayoutProps) {
  return (
    <div>
      <Flex maxW="960px" justify="center">
        네비게이션 바
      </Flex>
      <Box px={{ base: 4 }} pt={24} mx="auto" maxW="960px" minH="100vh" w="100%" bg={bg}>
        {children}
      </Box>
    </div>
  )
}
