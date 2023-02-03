import { ExpandMore } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated, config, WithAnimated } from 'react-spring'


interface props {
  title: string
  content: string | JSX.Element
}
const PolicyDropdown = ({ title, content }: props) => {

  const [open, toggle] = useState(false)
  const [props, animate] = useSpring(() => ({ height: "80px" }), []);

  const contentProps = useSpring({ opacity: open ? 1 : 0 })
  const ref = useRef<null | HTMLDivElement>(null);
  const contentRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return

    animate({
      height: (open ? contentRef.current.offsetHeight + 80 : 80) + "px"
    });
  }, [open, ref, toggle]);
  return (
    <animated.div style={props} className=' my-5 text-xl !w-10/12 border-y-2 border-gray-500 cursor-pointer  flex-col overflow-hidden content-start  ' onClick={() => toggle((v) => !v)} ref={ref}>
      <div className='flex last-of-type relative w-full justify-center my-5' >
        <span className='font-bold text-4xl -ml-5 '>{title}</span>
        <ExpandMore className='w-16 h-16 absolute -top-2 right-2' />
      </div>
      <div className={`h-auto text-left `} ref={contentRef}>
      {content}
      </div>

    </animated.div>
  )
}

export default PolicyDropdown