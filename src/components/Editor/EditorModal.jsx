import React, { useEffect, useRef, useContext } from 'react';
import { EditorContext } from '../Context/EditorContext';

function EditorModal() {
    const { initEditor, edjsParser } = useContext(EditorContext);
    const editorRef = useRef(null);

    const handleSave = () => {
        document.removeEventListener("editorSaved", handleSave);
        
        document.dispatchEvent(new Event("editorSaved"));
      };

    useEffect(() => {
        if (!editorRef.current) {
            initEditor();
            editorRef.current = true;
        }
    }, [initEditor]);

    return (
        <div className="modal fade modal-lg" id="note" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="noteLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-xl-down">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 align-center" id="staticBackdropLabel">Write your post Content</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div id='editorjs'></div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            <span className='pe-2'>Close</span>
                            <i className='bi bi-fullscreen-exit'></i>
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>
                            <span className='pe-2'>Save</span>
                            <i className='bi bi-save'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditorModal;