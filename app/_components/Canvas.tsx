"use client"
import React, { useEffect, useState} from 'react'
import { useEditor } from '../_hooks/useEditor'
import { ComponentType, Store, StorePayload, } from "../_types/ComponentType"
import { v4 as uuidv4 } from "uuid";

type Props = {}


export default function Canvas({ }: Props) {
  const [editor, dispatch, stack] = useEditor();

  const randomNum: () => number = ()=>{
    return Math.floor(Math.random() * 1000000000);
  }
  
type RenderProps = {
  component: ComponentType;
};

const getElement = (name: ComponentType["Name"]) => {
  switch (name) {
      case "Container":
          return "div";
      case "Section":
          return "section";
      case "Link":
          return "a";
      case "Text":
          return "p";
      case "TwoCol":
          return "div";
      case "ThreeCol":
          return "div";
      case "Video":
          return "video";
      case "__body":
          return "div";
      default:
          return "div";
  }
};
const RenderEditor = ({ component }: RenderProps) => {
  const Element = getElement(component.Name) as keyof JSX.IntrinsicElements;
  const { className, ...otherProperties } = component.Properties || {};
  const isBody = component.Id === "__body";

  return (
      <Element
          id={component.Id} // Use the stable ID
          className={className || ""}
          style={{ border: "1px solid #ccc", padding: "8px", margin: "4px" }}
          onDrop={isBody ? (e) => {
              e.preventDefault();
              const droppedItem = JSON.parse(e.dataTransfer.getData("text/plain")) as ComponentType;
              console.log("dropped",droppedItem)
              console.log("event",e.target)
              dispatch({
                  action: "ADD_COMPONENT",
                  payload: {
                      parentId: component.Id,
                      id: uuidv4(), // Generate a new UUID
                      content: droppedItem.Content,
                      child: droppedItem.Child,
                  } as StorePayload,
              });
          } : undefined}
          onDragOver={isBody ? (e) => e.preventDefault() : undefined}
      >
          {component.Content}
          {component.Child?.map((child) => (
              <RenderEditor key={child.Id} component={child} />
          ))}
      </Element>
  );
};


  return (
    <div className='h-full p-2'>
      <div className=' border-2 border-red-300 p-3 h-full'>
          <p>{editor.ParentComponent.Child?.length}</p>
          <button onClick={()=>{
            dispatch(
              {
                action: "ADD_COMPONENT",
                payload:
                  {
                    parentId: "__body",
                    id: new Date().toISOString(),
                    content: "Text",
                    child: null
                  } as StorePayload
              } as Store)
          }}>click me </button>
          <div className='h-full overflow-y-auto'>
            <RenderEditor key={editor.ParentComponent.Id} component={editor.ParentComponent} />
          </div>
        </div>
    </div>
  )
}