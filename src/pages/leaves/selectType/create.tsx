import React from 'react'

type Props = {}

const CreateLeave = ({ params } : { params : { slug: string}}) => {
  return (
    <div>CreateLeave Page {params.slug}</div>
  )
}

export default CreateLeave