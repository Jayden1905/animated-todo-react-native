import React, { useEffect, memo, ReactNode } from 'react'
import { Pressable } from 'react-native'
import { Text, HStack, Box } from 'native-base'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  interpolateColor,
} from 'react-native-reanimated'

interface Props {
  strikeThrough: boolean
  textColor: string
  inactiveTextColor: string
  onPress?: () => void
  children?: ReactNode
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
const AnimatedHStack = Animated.createAnimatedComponent(HStack)
const AnimatedText = Animated.createAnimatedComponent(Text)

export default function AnimatedTaskLabel({
  strikeThrough,
  textColor,
  inactiveTextColor,
  onPress,
  children,
}: Props) {
  const hstackOffset = useSharedValue(0)
  const hstackAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: hstackOffset.value }],
    }),
    [strikeThrough]
  )

  const textColorProgress = useSharedValue(0)
  const textColorAnimatedStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      ),
    }),
    [strikeThrough, textColor, inactiveTextColor]
  )

  const strikeThroughWidth = useSharedValue(0)
  const strikeThroughAnimatedStyle = useAnimatedStyle(
    () => ({
      width: `${strikeThroughWidth.value * 100}%`,
      borderBottomColor: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      ),
    }),
    [strikeThrough, textColor, inactiveTextColor]
  )

  useEffect(() => {
    const easing = Easing.out(Easing.quad)
    if (strikeThrough) {
      hstackOffset.value = withSequence(
        withTiming(4, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      )
      strikeThroughWidth.value = withTiming(1, { duration: 400, easing })
      textColorProgress.value = withDelay(
        1000,
        withTiming(1, { duration: 400, easing })
      )
    } else {
      strikeThroughWidth.value = withTiming(0, { duration: 400, easing })
      textColorProgress.value = withTiming(0, { duration: 400, easing })
    }
  })

  return (
    <Pressable onPress={onPress}>
      <AnimatedHStack alignItems='center' style={[hstackAnimatedStyle]}>
        <AnimatedText
          fontSize={19}
          noOfLines={1}
          isTruncated
          px={1}
          style={[textColorAnimatedStyle]}
        >
          {children}
        </AnimatedText>
        <AnimatedBox
          position='absolute'
          h={1}
          borderBottomWidth={1}
          style={[strikeThroughAnimatedStyle]}
        />
      </AnimatedHStack>
    </Pressable>
  )
}
