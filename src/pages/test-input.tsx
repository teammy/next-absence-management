import React from 'react'
import { Input  } from '@nextui-org/react'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { th } from 'date-fns/locale';

type Props = {}

export default function TestInput({}: Props) {
  return (
    <div className='grid justify-center mt-4'>
      <section id="input-number">
        <div className=' px-6 mt-4'>
          <DayPicker locale={th} />
        </div>
      </section>
    </div>
  )
}