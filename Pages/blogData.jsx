import React, { useContext, useEffect, useState } from 'react';
import { EditorContext } from '../src/components/Context/EditorContext';

function BlogData() {
    const { editorData, edjsParser } = useContext(EditorContext);
    const [convertedHtml, setConvertedHtml] = useState("");

    useEffect(() => {
        const updateHtml = () => {
            if (editorData && editorData.blocks) {
                const html = edjsParser.parse(editorData);
                setConvertedHtml(html);
                
                localStorage.setItem('blogContent', html);
            }
        };

        updateHtml();
    }, [editorData, edjsParser, setConvertedHtml]);

    return (
        <div>
            <div id="editorData" dangerouslySetInnerHTML={{ __html: convertedHtml }} />
        </div>
    );
}

export default BlogData;
