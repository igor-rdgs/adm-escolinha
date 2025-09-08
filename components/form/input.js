
import { forwardRef } from 'react'
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Text
} from '@chakra-ui/react'
import React from 'react'
import { Field, Input } from "@chakra-ui/react"


const Index = (
    { label, ...props },
    ref
) => {
   


    return (
        <Field.Root required>
      <Field.Label>
        {label} <Field.RequiredIndicator />
      </Field.Label>
      <Input {...props}/>
    </Field.Root>
    )
}

export default forwardRef(Index)




