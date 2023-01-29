import React, { useCallback, useState } from 'react'
import { VStack, Fab, Icon, useColorModeValue } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import TaskList from '../components/task-list'
import shortid from 'shortid'
import { TaskItemData } from '../components/task-list'
import Masthead from '../components/masthead'
import NavBar from '../components/navbar'

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
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w='full'
    >
      <Masthead
        title="What's up, Jayden!"
        image={require('../assets/masthead.png')}
      >
        <NavBar />
      </Masthead>
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt='-20px'
        borderTopLeftRadius='20px'
        borderTopRightRadius='20px'
        pt='20px'
      >
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          eidtingItemId={editingItemId}
        />
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
    </AnimatedColorBox>
  )
}
