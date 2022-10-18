import React, { Component, Dispatch, useEffect, useMemo, useRef, useState } from 'react'
import { BiBrightness } from 'react-icons/bi'
import { DEFAULT_OPTIONS, filter } from '../../constants/image-editor/filters'
import { change, changeFilter, filtersCount, resetFilters } from '../../features/image-editor/filtersSlice'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import Button from '../Button'
import Filter from './Filter'


const FiltersButtons = () => {

  const filters = useAppSelector(filtersCount)
  const dispatch = useAppDispatch();


  function resetSettings() {
    dispatch(resetFilters())
  }

  return (
    <div className='flex flex-col align-middle  '>
      {filters.map((option: filter) => {
        return (
          <Filter key={option.name} option={option} />
        )
      })}
      <div className='flex align-middle justify-center items-center'>
        <Button
          text={'Reset'}
          handleOnClick={() => resetSettings()}
        />
      </div>

    </div>
  )
}

export default FiltersButtons