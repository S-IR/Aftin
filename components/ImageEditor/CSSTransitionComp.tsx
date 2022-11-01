import React from 'react'
import { CSSTransition, TransitionGroup } from "react-transition-group"


interface props {
  activeSidebar: string
  sidebarButtons: JSX.Element
}

const CSSTransitionComp = ({activeSidebar, sidebarButtons }: props) => {
  return (
    <CSSTransition
      in={activeSidebar}
      appear={true}
      timeout={500}
      classNames="transitionSlide"
    >
      {sidebarButtons}
    </CSSTransition>
  )
}

export default CSSTransitionComp