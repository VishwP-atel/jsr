"use client"
import React from 'react'

type Props = {}

export default function Canvas({}: Props) {
  return (
    <div className='h-full p-2'>
        <div className=' border-2 border-red-300 p-3 h-full' 
        onDrop={(e:any)=>{
            e.stopPropagation();
            console.log(e.target.id)
            console.log("drop",JSON.parse(e.dataTransfer.getData("text/plain")));
        }}
        onDragOver={(e:any)=>{
            e.preventDefault();
        }}></div>
    </div>
  )
}