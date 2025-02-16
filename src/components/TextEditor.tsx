import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

type TextEditorProps = {
    text: string,
    setText: (value: string | undefined) => void;
}

export default function TextEditor({ text, setText }: TextEditorProps) {

    const handleChange = (value: string) => {
        setText(value);
    };

    return (
        <div>
            <ReactQuill value={text} onChange={handleChange} theme="snow" />
        </div>
    );
};