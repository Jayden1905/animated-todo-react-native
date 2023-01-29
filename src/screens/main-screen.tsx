import React, { useCallback, useState } from 'react'
import { Center, VStack, Fab, Icon, useColorModeValue } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import ThemeToggle from '../components/theme-toggle'
import TaskList from '../components/task-list'
import shortid from 'shortid'
import { TaskItemData } from '../components/task-list'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy movie tickets for Friday',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a reservation for dinner',
    done: false,
  },
]

export default function MainScreen() {
  const [data, setData] = useState(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleToggleTaskItem = useCallback((item: TaskItemData) => {
    setData((prevData) => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done,
      }
      return newData
    })
  }, [])

  const handleChangeTaskItemSubject = useCallback(
    (item: TaskItemData, subject: string) => {
      setData((prevData) => {
        const newData = [...prevData]
        const index = prevData.indexOf(item)
        newData[index] = {
          ...item,
          subject,
        }
        return newData
      })
    },
    []
  )

  const handleFinishEditingTaskItem = useCallback(() => {
    setEditingItemId(null)
  }, [])

  const handlePressTaskItemLabel = useCallback((item: any) => {
    setEditingItemId(item.id)
  }, [])

  const handleRemoveItem = useCallback((item: TaskItemData) => {
    setData((prevData) => {
      const newData = prevData.filter((i) => i !== item)
      return newData
    })
  }, [])

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      flex={1}
    >
      <VStack space={5} alignItems='center' w='full'>
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          eidtingItemId={editingItemId}
        />
        <ThemeToggle />
      </VStack>
      <Fab
        position='absolute'
        renderInPortal={false}
        size='sm'
        icon={<Icon color='white' as={<AntDesign name='plus' />} />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          setData([{ id, subject: '', done: false }, ...data])
          setEditingItemId(id)
        }}
      />
    </Center>
  )
}
