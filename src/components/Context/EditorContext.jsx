import React, { createContext, useRef, useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import Checklist from "@editorjs/checklist";
import SimpleImage from "@editorjs/simple-image";
import Embed from "@editorjs/embed";
import Underline from "@editorjs/underline";
import InlineCode from "@editorjs/inline-code";
import ChangeCase from "editorjs-change-case";
import ColorPlugin from "editorjs-text-color-plugin";
import Marker from "@editorjs/marker";
import edjsHTML from "editorjs-html";

export const EditorContext = createContext();

function EditorContextProvider(props) {
  const editorInstanceRef = useRef(null);
  const [editorData, setEditorData] = useState(null);
  const [convertedHtml, setConvertedHtml] = useState("");
  const edjsParser = edjsHTML();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: "Start here...",
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          tunes: ["anyTuneName"],
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5],
            defaultLevel: 2,
          },
        },
        list: {
          class: List,
          config: {
            defaultStyle: "unordered",
          },
        },
        anyTuneName: {
          class: AlignmentTuneTool,
          config: {
            default: "right",
            blocks: {
              header: "center",
              list: "right",
            },
          },
        },
        checklist: {
          class: Checklist,
        },
        image: {
          class: SimpleImage,
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              codepen: true,
            },
          },
        },
        underline: {
          class: Underline,
        },
        marker: {
          class: Marker,
        },
        InlineCode: {
          class: InlineCode,
        },
        changeCase: {
          class: ChangeCase,
        },
        color: {
          class: ColorPlugin,
          config: {
            colorCollections: [
              "#FF5733",
              "#FF1300",
              "#4285F4",
              "#7CBB00",
              "#FFC107",
              "#6200EA",
              "#FF4081",
              "#00ACC1",
              "#8BC34A",
              "#FF5722",
              "#795548",
            ],
            defaultColor: "#FF1300",
            customPicker: true,
          },
        },
      },
    });

    editorInstanceRef.current = editor;
  };

  const handleSave = () => {
    saveEditorData();
  };

  const saveEditorData = async () => {
    if (editorInstanceRef.current) {
      const data = await editorInstanceRef.current.save();
      setEditorData(data);
      console.log(data);

      // Remove the event listener after calling saveEditorData
      document.removeEventListener("editorSaved", handleSave);
    }
  };

  useEffect(() => {
    if (editorData && editorData.blocks) {
      const html = edjsParser.parse(editorData);
      setConvertedHtml(html);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("editorSaved", handleSave);

    return () => {
      document.removeEventListener("editorSaved", handleSave);
    };
  }, [handleSave]);

  return (
    <EditorContext.Provider value={{ initEditor, saveEditorData, edjsParser, editorData }}>
      {props.children}
    </EditorContext.Provider>
  );
}

export default EditorContextProvider;