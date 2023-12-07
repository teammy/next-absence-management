import React from 'react'
import { Input  } from '@nextui-org/react'

type Props = {}

export default function TestInput({}: Props) {
  return (
    <div className='grid justify-center mt-4'>
      <section id="input-number">
        <div className=' px-6 mt-4'>
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            labelPlacement="outside"

          />
          <Input
            className='mt-4'
            type="email"
            label="Email"
            placeholder="you@example.com"
            labelPlacement="outside"

          />
        </div>
      </section>
    </div>
  )
}