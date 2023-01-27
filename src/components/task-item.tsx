import React from 'react'
import {
  Box,
  useTheme,
  themeTools,
  useColorModeValue,
  HStack,
} from 'native-base'
import AnimatedCheckBox from './animated-checkbox'
import AnimatedTaskLabel from './animated-task-label'

type Props = {
  isDone: boolean
  handleCheckboxPress: () => void
}

export default function TaskItem({ isDone, handleCheckboxPress }: Props) {
  const theme = useTheme()
  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText')
  )
  const doneTextColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.600')
  )

  return (
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
      <AnimatedTaskLabel
        strikeThrough={isDone}
        textColor={activeTextColor}
        inactiveTextColor={doneTextColor}
      >
        Task Item
      </AnimatedTaskLabel>
    </HStack>
  )
}
