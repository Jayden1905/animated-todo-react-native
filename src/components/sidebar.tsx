import React, { useCallback } from 'react'
import {
  VStack,
  HStack,
  Center,
  Avatar,
  Heading,
  IconButton,
  useColorModeValue,
} from 'native-base'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import AnimatedColorBox from './animated-color-box'
import ThemeToggle from './theme-toggle'
import { Feather } from '@expo/vector-icons'
import { MenuButtom } from './menu-button'

const SideBar = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props
  const currentRoute = state.routeNames[state.index]

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer()
  }, [navigation])

  const handlePressMenuMain = useCallback(() => {
    navigation.navigate('Main')
  }, [navigation])

  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate('About')
  }, [navigation])

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}
    >
      <VStack flex={1} space={2}>
        <HStack justifyContent='flex-end'>
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant='outline'
            borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
            _icon={{
              as: Feather,
              name: 'chevron-left',
              size: 6,
              color: useColorModeValue('blue.800', 'darkBlue.700'),
            }}
          />
        </HStack>
        <Avatar
          source={require('../assets/profile-image.png')}
          size='xl'
          borderRadius={100}
          mb={6}
          borderColor='secondary.500'
          borderWidth={3}
        />
        <Heading mb={4} size='xl'>
          Kyaw Za Yan Naing
        </Heading>
        <MenuButtom
          active={currentRoute === 'Main'}
          onPress={handlePressMenuMain}
          icon='inbox'
        >
          Tasks
        </MenuButtom>
        <MenuButtom
          active={currentRoute === 'About'}
          onPress={handlePressMenuAbout}
          icon='info'
        >
          About
        </MenuButtom>
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </AnimatedColorBox>
  )
}

export default SideBar
