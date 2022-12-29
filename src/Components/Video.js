import React from 'react'
import './Video.css'
import  ReactDOM  from 'react-dom';
function Video(props) {
   const handleClick=(e)=>{
    console.log('handleclick')
     e.preventDefault();
     e.target.muted = !e.target.muted
  }
  const handleScroll=(e)=>{
    console.log('nodeisrun')
     let next=ReactDOM.findDOMNode(e.target).parentNode.nextSibling
     console.log(next)
     if(next){
      next.scrollIntoView()
      e.target.muted=true
     }
  }
  return (
    
        <video src={props.src} onEnded={handleScroll} onClick={handleClick} className='video-styling' muted='muted'></video>
  
  )
}

export default Video;