import React from 'react'
import { Input, Listbox,
  ListboxSection,
  ListboxItem  } from '@nextui-org/react'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { th } from 'date-fns/locale';

type Props = {}

export default function TestInput({}: Props) {
  return (
    <>
     <nav className="w-full bg-[#0050F0] text-white">
 ทดสอบ
</nav>
    <div className="md:flex">
   
    <div id="sidebar" className="hidden md:block md:w-1/6 h-screen bg-blue-600">
          
        </div>
        <div className="w-full md:w-5/6">
        
            <div className="bg-white p-4 shadow-md">
                <button id="open-sidebar" className="md:hidden bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Open Sidebar
                </button>
                <h1 className="text-xl">Main Content</h1>
            </div>

      
            <div className="p-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus libero non euismod volutpat. Mauris vitae arcu eu velit tincidunt consectetur. Quisque ultricies justo sed risus commodo, nec feugiat mi sollicitudin. Proin aliquet sapien non lorem lobortis, eu eleifend erat pulvinar. Pellentesque eu dolor lacinia, imperdiet urna ac, venenatis turpis. Mauris sit amet tortor at elit facilisis sollicitudin.</p>
            </div>
        </div>
    {/* <div className='grid justify-center mt-4'>
      <section id="input-number">
        <div className=' px-6 mt-4'>
          <DayPicker locale={th} />
        </div>
      </section>
    </div> */}
    </div>
    {/* sidebar */}
    </>
  )
}