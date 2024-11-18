"use client";

import JoditEditor from "jodit-react";
import { useRef, useMemo } from "react";

const RichTextEditor = ({ data, setState }: { data: any; setState: any }) => {
  const editorRef = useRef(null);
  const options = [
    "bold",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "|",
    "outdent",
    "indent",
    "align",
    "|",
    "hr",
    "|",
    "fullsize",
    "brush",
    "|",
    "table",
    "link",
    "|",
    "undo",
    "redo",
  ];

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
      defaultActionOnPaste: "insert_as_html",
      defaultLineHeight: 1.5,
      enter: "div",
      // options that we defined in above step.
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (typeof window === "undefined") {
    return null; // Ensure component only renders on the client
  }

  return (
    <div className="w-full">
      <JoditEditor
        ref={editorRef}
        value={data}
        {...config}
        onChange={(htmlString: any) =>
          setState((prev: any) => ({ ...prev, description: htmlString }))
        }
      />
    </div>
  );
};

export default RichTextEditor;
