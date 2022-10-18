import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import React, { useState } from 'react'
import FreeImageModal from './freeImageModal'
import PaidImageModal from './PaidImageModal'
import PremiumIcon from './PremiumIcon'

function SingleImage({ doc }) {

  const [premiumText, setPremiumText] = useState(false)
  const [open, setOpen] = useState(false)



  return (
    <>
      {doc.paid? <PaidImageModal open={open} setOpen={setOpen} /> : <FreeImageModal url={doc.url} open={open} setOpen={setOpen} />}
      <div className="relative shadow-lg  border-gray-300 cursor-pointer hover:border-4 hover:border-fuchsia-800 hover:translate-y-1 transition ease-in-out duration-300 " onMouseEnter={() => setPremiumText(true)} onMouseLeave={() => setPremiumText(false)} onClick={() => setOpen(true)} >

        <Image
          src={doc.url}
          alt='pizza-cliparts'
          width={512}
          height={512}
          objectFit='scale-down'
          className='rounded-2xl overflow-hidden '
        />
        {doc.paid && <PremiumIcon premiumText={premiumText} />}

      </div>
    </>


  )
}

export default SingleImage