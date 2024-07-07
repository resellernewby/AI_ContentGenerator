import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Settings() {
  return (
    <div className='flex item-center justify-center  h-full p-20'>
     <UserProfile/>
    </div>
  )
}

export default Settings
