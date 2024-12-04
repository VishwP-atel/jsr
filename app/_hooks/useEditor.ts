import {ComponentType,EditorType} from "../_types/ComponentType"



export const useEditor=()=>{
    const Body : ComponentType = {
        Name:"__body",
        Content:[] as ComponentType[],
        Properties : null
    }
    
    const editor:EditorType = {ParentComponent:Body} 

    return [editor,]
}
