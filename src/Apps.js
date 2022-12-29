import React from 'react'
import FirebaseAuth from './Firebase/FirebaseAuth'
import FiresStore from './Firebase/FiresStore'
function Apps() {
  return (
    <div>
        {/* <FirebaseAuth/> */}
        <FiresStore/>
    </div>
  )
}

export default Apps