import { useRouter } from 'next/router'
import React from 'react'
import { surr_env_array } from '../../../typings/image-types/ImageTypes'

interface props {
  surr_env : typeof surr_env_array[number]
}
const SortSurrEnv = ({surr_env} : props) => {
  const router = useRouter()
  const uri = router.route
  const query = router.query
  console.log(query);
  console.log(uri);
  
  return (
    <div>SortSurrEnv</div>
  )
}

export default SortSurrEnv