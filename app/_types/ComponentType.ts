
export type ComponentType = {
    Name: "Text" | "Container" | "Section" | "Link" | "TwoCol"  | "ThreeCol" | "Video" | "__body" | null;
    Content : string | null;
    Child :  ComponentType[] | null;
    Properties : {} | null;
    Id : string;
}
export type EditorType = {
    ParentComponent:ComponentType;
}
export type ImportEditorPayload = {
    editor: EditorType;
};
export type StorePayload = { name:"Text" | "Container" | "Section" | "Link" | "TwoCol"  | "ThreeCol" | "Video" | "__body" | null; parentId: string; id: string; content:  string | null;child :ComponentType[] |null }
export type Store = {
    action: "ADD_COMPONENT" | "EDIT_COMPONENT" | "DELETE_COMPONENT" | "IMPORT_EDITOR";
    payload: StorePayload | ImportEditorPayload;
};