import React from 'react'
import { PuffLoader } from 'react-spinners'

const Loading = () => {
  return (
    <section className='w-full h-full bg-black/20 flex items-center justify-center'>
      <PuffLoader
      color={`purple`}
      aria-label="Loading Spinner"
      data-testid="loader"
      />
    </section>
  )
}

export default Loading