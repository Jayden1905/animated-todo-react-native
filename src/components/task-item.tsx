import React, { useCallback } from 'react'
import {
  Box,
  useTheme,
  themeTools,
  useColorModeValue,
  HStack,
  Icon,
  Input,
} from 'native-base'
import AnimatedCheckBox from './animated-checkbox'
import AnimatedTaskLabel from './animated-task-label'
import SwipableView from './swipable-view'
import { Feather } from '@expo/vector-icons'
import { PanGestureHandlerProps } from 'react-native-gesture-handler'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  isEditing: boolean
  isDone: boolean
  handleCheckboxPress: () => void
  onPressLabel?: () => void
  onRemove?: () => void
  onChangeSubject?: (subject: string) => void
  onFinishEditing?: () => void
  subject: string
}

export default function TaskItem({
  isEditing,
  isDone,
  handleCheckboxPress,
  subject,
  onPressLabel,
  onRemove,
  onChangeSubject,
  onFinishEditing,
  simultaneousHandlers,
}: Props) {
  const theme = useTheme()

  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText')
  )

  const doneTextColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.600')
  )

  const handleChangeSubject = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text)
    },
    [onChangeSubject]
  )

  return (
    <SwipableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Box
          w='full'
          h='full'
          bg='red.500'
          alignItems='flex-end'
          justifyContent='center'
          pr={4}
        >
          <Icon color='white' as={<Feather name='trash-2' />} size='sm' />
        </Box>
      }
    >
      <HStack
        alignItems='center'
        w='full'
        px={4}
        py={2}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
        <Box width={30} height={30} mr={2}>
          <AnimatedCheckBox
            check={isDone}
            handleCheckboxPress={handleCheckboxPress}
          />
        </Box>
        {isEditing ? (
          <Input
            placeholder='Task'
            value={subject}
            variant='unstyled'
            fontSize={19}
            px={1}
            py={0}
            autoFocus
            blurOnSubmit
            onChange={handleChangeSubject}
            onBlur={onFinishEditing}
          />
        ) : (
          <AnimatedTaskLabel
            strikeThrough={isDone}
            textColor={activeTextColor}
            inactiveTextColor={doneTextColor}
            onPress={onPressLabel}
          >
            {subject}
          </AnimatedTaskLabel>
        )}
      </HStack>
    </SwipableView>
  )
}
