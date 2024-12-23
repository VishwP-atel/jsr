import { Component, useState } from "react";
import { ComponentType, EditorType, ImportEditorPayload, Store, StorePayload } from "../_types/ComponentType";

export const useEditor = () => {
    const Body: ComponentType = {
        Name: "__body",
        Content: null,
        Child: [] as ComponentType[],
        Properties: { className: "h-full" },
        Id: "__body",
    };

    const initialEditor: EditorType = { ParentComponent: Body };

    const [editor, setEditor] = useState<EditorType>(initialEditor);
    const [HistoryStack, setHistoryStack] = useState<EditorType[]>([initialEditor]);
    const [HistoryStackIndex, setHistoryStackIndex] = useState<number>(0);

    const addComponentToEditor = (component: ComponentType, payload: StorePayload): ComponentType => {
        if (component.Id === payload.parentId) {
            return {
                ...component,
                Child: [
                    ...(component.Child || []),
                    {
                        Name: payload.name,
                        Content: payload.content,
                        Child: payload.child || [],
                        Properties: {},
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
            case "ADD_COMPONENT": {
                const newEditorState = {
                    ParentComponent: addComponentToEditor(editor.ParentComponent, store.payload  as StorePayload ),
                };

                const newHistory = HistoryStack.slice(0, HistoryStackIndex + 1);
                setHistoryStack([...newHistory, newEditorState]);
                setHistoryStackIndex(newHistory.length);

                setEditor(newEditorState);
                break;
            }

            case "EDIT_COMPONENT":
                // Placeholder for edit logic
                break;

            case "DELETE_COMPONENT":
                // Placeholder for delete logic
                break;
            case "IMPORT_EDITOR":
                const { editor: importedEditor } = store.payload as ImportEditorPayload;
            setEditor(importedEditor);

            // Clear history and set new initial state
            setHistoryStack((prev)=>{return [...prev,{ ParentComponent: importedEditor.ParentComponent }]});
            setHistoryStackIndex((prev)=>{return prev+1});
            break;
            default:
                throw new Error(`Unknown action: ${store.action}`);
        }
    };

    const stack = {
        undo: () => {
            if (HistoryStackIndex > 0) {
                const newIndex = HistoryStackIndex - 1;
                setHistoryStackIndex(newIndex);
                setEditor(HistoryStack[newIndex]);
            }
        },
        redo: () => {
            if (HistoryStackIndex < HistoryStack.length - 1) {
                const newIndex = HistoryStackIndex + 1;
                setHistoryStackIndex(newIndex);
                setEditor(HistoryStack[newIndex]);
            }
        },
    };

    return [editor, dispatch, stack] as const;
};
