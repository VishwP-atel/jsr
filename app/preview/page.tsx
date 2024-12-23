// app/preview/page.tsx
"use client"
import React, { useEffect, useState } from 'react';

const Preview = () => {
    const [editorState, setEditorState] = useState(null);

    useEffect(() => {
        // Retrieve the editor state from localStorage
        const savedEditorState = localStorage.getItem('editorState');
        if (savedEditorState) {
            const parsedEditorState = JSON.parse(savedEditorState);
            setEditorState(parsedEditorState.ParentComponent);
        }
    }, []);

    const renderComponentAsHTML = (component) => {
        if (!component) return null;

        const { Name, Content, Child } = component;
        const Element = getElement(Name);

        return (
            <Element key={component.Id} style={{padding: "8px", margin: "4px" }}>
                {Content}
                {Child?.map(renderComponentAsHTML)}
            </Element>
        );
    };

    const getElement = (name) => {
        switch (name) {
            case "Container": return "div";
            case "Section": return "section";
            case "Link": return "a";
            case "Text": return "p";
            case "TwoCol": return "div";
            case "ThreeCol": return "div";
            case "Video": return "video";
            case "__body": return "div";
            default: return "div";
        }
    };

    return (
        <div>
            <h2>Preview</h2>
            <div>{editorState ? renderComponentAsHTML(editorState) : 'Loading preview...'}</div>
        </div>
    );
};

export default Preview;
