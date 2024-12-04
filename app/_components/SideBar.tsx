"use client"
import React, { ReactNode } from 'react'
import {AllComponent} from "../_constants/components"
import { ComponentType } from '../_types/ComponentType'
type Props = {}

const SideBar = (props: Props) => {
  return (
    <>
    <div className='text-center text-2xl font-bold '>Components</div>
    <hr className=' border mt-2 border-slate-500'/>
    <div className='grid grid-cols-2 mt-5 gap-2'>

        {
            AllComponent.map((component:ComponentType )=>{
                return <div draggable={true} onDragStart={(e:React.DragEvent)=>{
                    switch (component.Name) {
                        case "Text":
                            console.log("in text");
                            e.dataTransfer.setData("text/plain",JSON.stringify(component));
                            break;
                        case "Container":
                            e.dataTransfer.setData("text/plain",JSON.stringify(component));
                            break;
                        default:
                            e.dataTransfer.setData("text/plain",JSON.stringify("Invalid Componentr"));
                            break;
                    }
                    e.dataTransfer.setData("data","");
                }} className='border-2 border-slate-500 rounded-md hover:bg-slate-500 hover:text-white items-center p-5' data-component={component.Name} key={component.Name}>{component.Name}</div>
            })
        }
  
    </div>
    </>
  )
}
export default SideBar