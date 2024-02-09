import React from "react";
import EditorModal from "./components/Editor/EditorModal";
import BlogData from "../Pages/blogData";

function App() {
    const [convertedHtml, setConvertedHtml] = React.useState("");

    React.useEffect(() => {
        // Retrieve HTML content from localStorage on component mount
        const storedHtml = localStorage.getItem('blogContent');
        if (storedHtml) {
            setConvertedHtml(storedHtml);
        }

        const handleEditorSaved = () => {
            // Update convertedHtml and store in localStorage
            const newHtml = document.getElementById("editorData").innerHTML;
            setConvertedHtml(newHtml);
            localStorage.setItem('blogContent', newHtml);
        };

        document.addEventListener("editorSaved", handleEditorSaved);

        return () => {
            document.removeEventListener("editorSaved", handleEditorSaved);
        };
    }, []);

    return (
        <>
            <EditorModal />
            <div className="position-fixed bottom-0 end-0 m-4 z-2">
                <button
                    className="btn btn-primary d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#note"
                >
                    <span className="pe-2">Make a Blog Post</span>
                    <i className="bi bi-pencil-square"></i>
                </button>
            </div>
            <h3>Html Content</h3>
            <BlogData />
            <div>
                <div dangerouslySetInnerHTML={{ __html: convertedHtml }} />
            </div>
        </>
    );
}

export default App;
