import React from 'react'

interface IMain{
  children: React.ReactNode
}

function Main({ children }: IMain) {
  return (

      <div className="grid px-0 lg:px-10 lg:py-5 mx-auto w-full bg-[#E9F4FF]">
      {children}
      </div>

  );
}

export default Main