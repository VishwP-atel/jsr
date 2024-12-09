import { Component, useState } from "react";
import { ComponentType, EditorType, Store, StorePayload } from "../_types/ComponentType";

export const useEditor = () => {
    const Body: ComponentType = {
        Name: "__body",
        Content: null,
        Child : [] as ComponentType[],
        Properties: {className:"h-full"},
        Id: "__body",
    };

    const [editor, setEditor] = useState<EditorType>({ ParentComponent: Body });
    
        const addComponentToEditor = (component: ComponentType, payload: StorePayload): ComponentType => {
            if (component.Id === payload.parentId) {
                console.log("first time")
                return {
                    ...component,
                    Child: [
                        ...(component.Child || []), // Ensure Child is treated as an array
                        {
                            Name: payload.name,
                            Content: payload.content,
                            Child: payload.child || [],
                            Properties: null,
                            Id: payload.id,
                        },
                    ],
                };
            }
    
            if (Array.isArray(component.Child)) {
                return {
                    ...component,
                    Child: component.Child.map((child) => addComponentToEditor(child, payload)),
                };
            }
    
            return component;
        };
    
        // Dispatch function to handle actions
        const dispatch = (store: Store): void => {
            switch (store.action) {
                case "ADD_COMPONENT":
                    setEditor({
                        ParentComponent: addComponentToEditor(editor.ParentComponent, store.payload),
                    });
                    break;
    
                case "EDIT_COMPONENT":
                    // Placeholder for edit logic
                    break;
    
                case "DELETE_COMPONENT":
                    // Placeholder for delete logic
                    break;
    
                default:
                    throw new Error(`Unknown action: ${store.action}`);
            }
        };

    const HistoryStack: EditorType[] = [editor];
    let HistoryStackIndex: number = 0;

    const stack = {
        undo: () => {
            if (HistoryStackIndex > 0) {
                HistoryStackIndex--;
                setEditor(HistoryStack[HistoryStackIndex]);
            }
        },
        redo: () => {
            if (HistoryStackIndex < HistoryStack.length - 1) {
                HistoryStackIndex++;
                setEditor(HistoryStack[HistoryStackIndex]);
            }
        },
    };

    return [editor, dispatch, stack] as const;
};
