import React, { useEffect } from 'react'
import vid1 from '../Assets/vid1.mp4'
import vid2 from '../Assets/vid2.mp4'
function Observer() {
      const callback=(entry)=>{
        entry.forEach((entry)=>{
            let ele=entry.target.childNodes[0];
            console.log(ele)
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause();
                }
            })
        })
      }
    var observer = new IntersectionObserver(callback, {threshold:0.6});
    useEffect(()=>{
      const elements=document.querySelectorAll(".videos")
      elements.forEach((element)=>{
        observer.observe(element)
      })
    },[])
  return (
    <div className='video-container'>
        <div className='videos'>
            <video src={vid1} muted='muted' style={{height:'85vh'}}/>
        </div>
        <div className='videos'>
            <video src={vid1} muted='muted' style={{height:'85vh'}}/>
        </div>
    </div>
  )
}

export default Observer