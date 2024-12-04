import React from 'react'
import SideBar from '../_components/SideBar'
import Canvas from '../_components/Canvas'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='h-[100vh] p-2'>
    <div className='h-full w-full flex border-2 rounded-sm border-dashed border-slate-500'>
        
        <div className='border p-2 m-2 w-[250px] border-red-600'><SideBar/></div>
        <div className='border p-2 m-2 flex-grow border-green-600'><Canvas/></div>
        
    </div>
    </div>
  )
}