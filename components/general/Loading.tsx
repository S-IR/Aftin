import React from 'react'
import { PuffLoader } from 'react-spinners'

interface props {
  w? : number
  h? :number
}

const Loading = ({w, h}: props) => {
  return (
    <section className={`${w? `w-[${w}]`: `w-full`}  ${h? `h-[${h}]` : `h-full`}  flex items-center justify-center z-[100]`}>
      <PuffLoader
      color={`purple`}
      aria-label="Loading Spinner"
      data-testid="loader"
      />
    </section>
  )
}

export default Loading