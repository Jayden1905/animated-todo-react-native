import React, { useCallback, useState } from 'react'
import { Box, Center, VStack } from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import TaskItem from '../components/task-item'

export default function MainScreen() {
  const [checked, setChecked] = useState<boolean>(false)
  const [subject, setSubject] = useState<string>('Task Item')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleCheckboxPress = useCallback(() => {
    setChecked((prev) => !prev)
  }, [])

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems='center' w='full'>
        <Box w={'full'}>
          <TaskItem
            isEditing={isEditing}
            isDone={checked}
            subject={subject}
            onPressLabel={() => setIsEditing(true)}
            handleCheckboxPress={handleCheckboxPress}
            onChangeSubject={setSubject}
            onFinishEditing={() => setIsEditing(false)}
          />
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}
