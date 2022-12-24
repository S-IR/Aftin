import React, { useEffect } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { activeSidebarType } from '../../../pages/image-editor'


interface props {
  activeSidebar: activeSidebarType
  sidebarName: activeSidebarType
  sidebarButtons: JSX.Element
  showSidebar: boolean
}




const CSSTransitionComp = ({activeSidebar, sidebarName,  sidebarButtons, showSidebar }: props) => {


  
  

  return (
    <CSSTransition
      in={activeSidebar === sidebarName}
      appear={true}
      timeout={500}
      classNames="transitionSlide"
    >
      <animated.div className={`${showSidebar ? `visible  opacity-1 w-auto ` : `hidden opacity-0 w-[0px]`} transition-all duration-500`} >
      {sidebarButtons}

      </animated.div>
    </CSSTransition>
  )
}

export default CSSTransitionComp