import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, Popover, Snackbar, SnackbarContent, Tooltip, Typography } from '@mui/material'
import { Done } from '@mui/icons-material'
import Cookies from 'js-cookie'
import * as gtag from '../../../lib/gtag'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { cookiesConsentOptions } from '../../../constants/general/cookiesConsentOptions'
import FormGroup from '@mui/material/FormGroup/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel'
import Switch from '@mui/material/Switch/Switch'


interface props {
  open: boolean
  setCookiesConsent: React.Dispatch<React.SetStateAction<boolean>>
}

interface customInputs {
  'ad_storage'?: boolean,
  'analytics_storage'?: boolean,
  'functionality_storage'?: boolean,
  'personalization_storage'?: boolean,
  'security_storage'?: boolean
}
const ConsentCookiesSnackbar = ({ open, setCookiesConsent }: props) => {

  const [openCustom, setOpenCustom] = useState(false)


  const handleOpenCustom = (event: React.MouseEvent<HTMLElement>) => {
    setOpenCustom(true)
  };


  const handleClosenCustom = () => {
    setOpenCustom(false)
  };

  const handleClose = () => {
    console.log('WORK IN PROGRESS');
  }
  const acceptAllCookies = () => {
    gtag.acceptAllCookies()
    setCookiesConsent(false)
  }

  const rejectAllCookies = () => {
    gtag.rejectAllCookies()
    setCookiesConsent(false)
  }

  const {
    control,
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<customInputs>()

  const onCustomSubmit = (e) => {
    console.log(`e:`, e);

  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      onClose={handleClose}
      message="We value your privacy"
      className='p-2 z-50 '
    >
      <SnackbarContent
        message={
          <div className='flex relative flex-col p-2 ' >
            <div className='flex items-center justify-center align-middle space-x-2'>
              <span className='  text-2xl font-serif text-red-500 '>We value your privacy</span>
            </div>

            <div className='flex w-96 h-auto p-5'>
              <span className='font-serif text-lg text-center'>{`We utilize cookies to enhance your browsing experience, serving personalized ads or content, and analyze our traffic. Cookies are small text files which are placed on your computer to remember preferences and some details of your visit. By clicking "Accept All" or by closing this popup you consent to our use of non-essential cookies`}</span>
            </div>
            <div className='w-full flex space-x-2'>
              <button onClick={acceptAllCookies} className='font-bold shadow-sm shadow-black  tex-white bg-orange-900 drop-shadow-xl w-32  p-2 filter-none hover:filter hover:shadow-none brightness-125 transition-all duration-300 '>Accept All</button>
              <button onClick={rejectAllCookies} className='font-bold shadow-sm shadow-black  drop-shadow-xl w-32  p-2 border-orange-900 border-2  text-white filter-none hover:filter hover:shadow-none brightness-125 transition-all duration-300 '>Reject</button>
              <button onClick={handleOpenCustom} className='font-bold shadow-sm shadow-black   w-32  p-2 bg-orange-900/10 filter-none hover:filter hover:shadow-none brightness-125 transition-all duration-300  '>Customize</button>
            </div>
            <Dialog
              open={openCustom}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"

            >

              <DialogTitle id="alert-dialog-title" sx={{ fontFamily: 'serif', marginX: 'auto', fontSize: 32 }} >
                {"Customize your cookie settings"}
              </DialogTitle>
              <DialogContent>
                <form onSubmit={handleSubmit(onCustomSubmit)} className='sm:w-auto z-50 bg-gray-900  rounded-md space-y-8 drop-shadow-xl   md:px-14 flex-row row-span-1 justify-center items-center text-white p-4 mx-auto'>
                  <div className='space-y-4 w-full'>
                    {cookiesConsentOptions.map((option) => (
                      <div key={option.id} className='flex w-full h-auto items-center shadow-md border-y-2 border-gray-500 '>
                        <Controller
                          control={control}
                          name={`${option.id}`}
                          defaultValue={false}
                          render={({ field }) => {
                            return (
                              <Switch
                              {...field}

                              />
                            );
                          }}
                          rules={{ required: false }}
                        />
                        <p>{option.description}</p>
                      </div>
                    ))}
                  </div>
                  {/* <div className='flex'>
                  <button className='border-2 border-gray-500 grow  mt-2' >Accept All
                  </button> */}
                  <button type='submit' className='general-buttons !mt-2'  >Set Cookies
                  </button>
                  {/* <button className='border-2 border-gray-500 grow  mt-2' >Reject All
                  </button>
                  </div> */}
                </form>
              </DialogContent>

            </Dialog>
            <button className='font-serif mt-5 hover:underline transition-all duration-300'> Our full privacy policy</button>
          </div>
        }


      />


    </Snackbar>
  )

}
export default ConsentCookiesSnackbar