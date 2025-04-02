import React from 'react'
import DefaultInputs from './DefaultInputs'
import TextArea from './TextAreaInput'
import ComponentCard from '../../common/ComponentCard'

export default function Inputs() {
  return (
    <ComponentCard title="Input Fields">
      <DefaultInputs />
      <TextArea />
    </ComponentCard>
  )
}
