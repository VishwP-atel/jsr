"use client"
import React, { useEffect, useState} from 'react'
import { useEditor } from '../_hooks/useEditor'
import { ComponentType, Store, StorePayload, } from "../_types/ComponentType"
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import dotenv from "dotenv"
import { useRouter } from 'next/navigation';

dotenv.config();
type Props = {}

const SECRET_KEY = process.env.SECRET_KEY || "SECRET";


export default function Canvas({ }: Props) {
  const [editor, dispatch, stack] = useEditor();
  const [fileName, setFileName] = useState<string>('Import File');
  const [selectedElement,setSelectedElement] = useState<string|null>(null);
  const router = useRouter();
  const handleExport = () => {
    const editorState = JSON.stringify(editor); // Convert editor state to JSON
    const encryptedData = CryptoJS.AES.encrypt(editorState, SECRET_KEY).toString(); // Encrypt data

    // Create a downloadable blob
    const blob = new Blob([encryptedData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "editor-data.vizz"; // File name
    link.click();
    URL.revokeObjectURL(url);
};

const handlePreview = () => {
  localStorage.setItem('editorState', JSON.stringify(editor));
  window.open(
    "/preview", "_blank");
};

// Import function
const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const encryptedData = e.target?.result as string;
        try {
            // Decrypt data
            const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

            // Parse and set editor state
            const parsedData = JSON.parse(decryptedData);
            dispatch({ action: "IMPORT_EDITOR", payload: { editor: parsedData } });
        } catch (error) {
            console.error("Failed to import editor data:", error);
            alert("Invalid or corrupted file.");
        }
    };
    reader.readAsText(file);
};
  
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
  const isDroppable = ["__body", "Container", "Section", "TwoCol", "ThreeCol"].includes(
    component.Name || ""
);
  return (
      <Element
          id={component.Id} // Use the stable ID
          className={className || "" || component.Id === selectedElement ? "border-red-500 border border-dashed":""}
          style={{
            border: isDroppable ? "2px dashed #ccc" : "1px solid #ccc",
            padding: "8px",
            margin: "4px",
        }}
          onDrop={isDroppable ? (e) => {
              e.preventDefault();
              console.log(e.target.id)
              const droppedItem = JSON.parse(e.dataTransfer.getData("text/plain")) as ComponentType;
              dispatch({
                  action: "ADD_COMPONENT",
                  payload: {
                      parentId: e.target.id || component.Id,
                      id: uuidv4(), // Generate a new UUID
                      content: droppedItem.Content,
                      child: droppedItem.Child,
                      name:droppedItem.Name
                  } as StorePayload,
              });
          } : undefined}
          onDragOver={isDroppable ? (e) => e.preventDefault() : undefined}
          onClick={(e)=>{setSelectedElement(e.target.id)}}
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
          <button className='m-3 p-2 rounded-md text-white text-md border border-blue-400 bg-blue-600  ' onClick={()=>{stack.undo();console.log(editor)}}>undo </button>
          <button className='-3 p-2 rounded-md text-white text-md border border-orange-300 bg-orange-500  ' onClick={()=>{stack.redo()}}>redo </button>

          <button
                onClick={handlePreview}
                className="px-4 py-2 bg-yellow-500/50 text-white rounded-md"
            >
                Preview
            </button>

          <button className='m-3 p-2 rounded-md text-white text-md border border-indigo-300 bg-indigo-500  ' onClick={handleExport}>Export </button>
          <label
                htmlFor="fileInput"
                className="m-3 p-2 rounded-md border border-rose-300 bg-rose-500 text-md text-white cursor-pointer"
                
            >
                Import
            </label>
          <input id="fileInput" className='-3 p-2 rounded-md text-white text-md border  hidden ' type='file' accept='.vizz' onChange={handleImport} />
          {fileName && (
                <p className="mt-2 text-sm text-gray-500">Selected file: {fileName}</p>
            )}
          <div className='h-full overflow-y-auto'>
            <RenderEditor key={editor.ParentComponent.Id} component={editor.ParentComponent} />
          </div>
        </div>
    </div>
  )
}