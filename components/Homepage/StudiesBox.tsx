import Link from 'next/link';
import React from 'react'
import { useInView } from 'react-intersection-observer';
import { StudiesList } from '../../constants/StudiesList';

function StudiesBox() {

  const { ref : animatedDOM, inView : animatedDOMVisible} = useInView();

  return (
    <section className='relative'>
      <p ref={animatedDOM} className={`opacity-0 text-4xl md:text-6xl  my-10 ml-4 md:ml-10 font-serif text-orange-300 font-bold ${animatedDOMVisible? 'opacity-100' : ''}`}>
        Your brand image <span className='text-purple-800'> determines </span> <br></br> your number of clients as never before </p>
      <figure className='grid font-serif  '>
        <div className='grid ml-3  md:ml-96  w-[200px] md:w-[400px] font-serif text-md md:text-xl space-y-4 md:space-y-6 border-l-2 border-gray-600 border-solid px-2  '>
          {StudiesList.map((study) =>(
           <Link key={study.text} href={study.href}>
           <a  className='w-[200px]'  ><p className='text-wrap h-[100px] w-[200px] break-words mr-4'>{study.text}</p></a>
           </Link> 
          ))}
        </div>
      </figure>


    </section>
  )
}

export default StudiesBox