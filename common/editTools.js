import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

function EditTools({ value, setValue }) {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["image", "link"],

    ["clean"], // remove formatting button
  ];
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      className={"min-h-[200px] bg-gray-50 border"}
      modules={{ toolbar: toolbarOptions }}
      placeholder={"Please Enter Product Description..."}
    />
  );
}

export default EditTools;
