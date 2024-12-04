
export type ComponentType = {
    Name: "Text" | "Container" | "Section" | "Link" | "2Col"  | "3Col" | "Video" | "__body" | null;
    Content : string | ComponentType[] | null;
    Properties : {} | null;
}
export type EditorType = {
    ParentComponent:ComponentType;
}