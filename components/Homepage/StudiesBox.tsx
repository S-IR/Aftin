import Link from 'next/link';
import React from 'react'
import { useInView } from 'react-intersection-observer';
import { StudiesList } from '../../constants/StudiesList';

function StudiesBox() {

  const { ref : animatedDOM, inView : animatedDOMVisible} = useInView();

  return (
    <section className='relative'>
      <p ref={animatedDOM} className={`opacity-0 text-6xl  my-10 ml-10 font-serif text-black font-bold ${animatedDOMVisible? 'opacity-100' : ''}`}>
        Your brand image <span className='text-purple-800'> determines </span> <br></br> your number of clients as never before </p>
      <figure className='grid font-serif  '>
        <div className='grid ml-3 md:ml-96  w-[400px] font-serif text-md md:text-xl space-y-4 md:space-y-6 border-l-2 border-gray-600 border-solid px-2  '>
          {StudiesList.map((study) =>(
           <Link key={study.text} href={study.href}>
           <a  className='links-general text-'  >{study.text}</a>
           </Link> 
          ))}
        </div>
      </figure>


    </section>
  )
}

export default StudiesBox