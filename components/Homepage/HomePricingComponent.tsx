import React from 'react'
import styles from '../../styles/Home.module.css'

const HomePricingComponent = () => {
  return (
      <>
      <div className='flex justify-center text-center space-y-4 '>
      <h2 className=' text-2xl md:text-6xl shadow-lg font-serif drop-shadow-xl'>
          Make people talk about your food <br></br> Either :
      </h2>
      </div>

    <div className='flex justify-center text-center'>
      <button className=' w-80 h-80 bg-orange-800 text-white rounded-full font-serif space-y-2 hover:bg-black hover:text- transition-all duration-300 hover:translate-y-1 shadow-xl  '>
       <h3 className=' font-bold'>Work with a professional designer </h3>
       <p>Ask a professional to design your desired website, banner, logo or any graphic design element through our partners</p>
      </button>
    </div>

    <div className='flex justify-center text-center space-y-2 '>
      <h2 className=' text-2xl md:text-6xl shadow-lg font-serif drop-shadow-xl'>
          Or:
      </h2>
      </div>

    <div className=' flex flex-col md:flex-row py-6 justify-center items-center mt-20 md:mt-0 align-top w-auto h-auto'>
      <button className={`${styles.homePricing}`} >
        <h2 className='font-bold text-lg py-2 text-red-600 '>
          Aftin Exquisite
        </h2>
        <p>
          For leaders who want to <br></br> unlock our full Graphic Design toolkit  <br></br> to achieve the best results
        </p>
      </button>

      <button className={`${styles.homePricing}`} >
        <h2 className='font-bold text-lg py-2 text-red-600 '>
          Aftin Premium
        </h2>
        <p>
          For small to medium sized enterprises who <br></br>
          need fitting stock images and perfect <br></br> graphic design art
        </p>
      </button>

      <button className={`${styles.homePricing} `} >
        <h2 className='font-bold text-lg py-2 text-red-600 '>
          Aftin Lite
        </h2>
        <p>
          For individuals who need to get <br></br>
          appealing food images quick.
        </p>
      </button>

    </div>
      </>

  )
}

export default HomePricingComponent