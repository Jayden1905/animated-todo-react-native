import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import AnimatedCheckbox from 'react-native-checkbox-reanimated'

type Props = {
  check: boolean
  handleCheckboxPress: () => void
}

export default function AnimatedCheckBox({
  check,
  handleCheckboxPress,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={handleCheckboxPress} style={styles.checkbox}>
        <AnimatedCheckbox
          checked={check}
          highlightColor='#4444ff'
          checkmarkColor='#ffffff'
          boxOutlineColor='#4444ff'
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: '100%',
    height: '100%',
  },
})
