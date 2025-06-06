// src/app/admin/components/TextEditor.js
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { BubbleMenu } from '@tiptap/react';
import FontSize from '@tiptap/extension-font-size';
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaListUl,
    FaListOl,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
    FaLink,
    FaFont,
    FaEraser,
    FaParagraph,
    FaImage,
    FaStrikethrough,
    FaCode,
    FaQuoteLeft,
    FaRedo,
    FaUndo,
    FaSubscript,
    FaSuperscript
} from 'react-icons/fa';
import { MdFormatColorText, MdOutlineHorizontalRule } from 'react-icons/md';
import { BiFontSize } from 'react-icons/bi';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    // Font size options
    const fontSizeOptions = [
        { value: '12px', label: 'Small' },
        { value: '16px', label: 'Normal' },
        { value: '20px', label: 'Large' },
        { value: '24px', label: 'XL' },
        { value: '32px', label: 'XXL' },
    ];

    return (
        <div className="flex flex-wrap gap-1 mb-2 border-b pb-2 items-center">
            {/* Undo/Redo */}
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className={`p-1.5 rounded hover:bg-gray-100 ${!editor.can().undo() ? 'text-gray-400' : 'text-gray-700'}`}
                title="Undo"
            >
                <FaUndo className="h-5 w-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className={`p-1.5 rounded hover:bg-gray-100 ${!editor.can().redo() ? 'text-gray-400' : 'text-gray-700'}`}
                title="Redo"
            >
                <FaRedo className="h-5 w-5" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            {/* Font size dropdown */}
            <div className="flex items-center gap-1">
                <BiFontSize className="h-5 w-5 text-gray-700" />
                <select
                    value={editor.getAttributes('textStyle').fontSize || '16px'}
                    onChange={(e) => {
                        const size = e.target.value;
                        if (size === '16px') {
                            editor.chain().focus().unsetFontSize().run();
                        } else {
                            editor.chain().focus().setFontSize(size).run();
                        }
                    }}
                    className="p-1 text-sm border rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    {fontSizeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            {/* Text formatting buttons */}
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                title="Bold"
            >
                <FaBold className="h-5 w-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                title="Italic"
            >
                <FaItalic className="h-5 w-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                title="Underline"
            >
                <FaUnderline className="h-5 w-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('strike') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                title="Strikethrough"
            >
                <FaStrikethrough className="h-5 w-5" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>



            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            {/* Text alignment */}
            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                title="Align Left"
            >
                <FaAlignLeft className="h-5 w-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                title="Align Center"
            >
                <FaAlignCenter className="h-5 w-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                title="Align Right"
            >
                <FaAlignRight className="h-5 w-5" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            {/* Link */}
            <button
                onClick={() => {
                    const previousUrl = editor.getAttributes('link').href;
                    const url = window.prompt('URL', previousUrl || 'https://');

                    if (url === null) return;
                    if (url === '') {
                        editor.chain().focus().extendMarkRange('link').unsetLink().run();
                        return;
                    }

                    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                }}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                title="Link"
            >
                <FaLink className="h-5 w-5" />
            </button>

            {/* Text color */}
            <div className="relative group">
                <button
                    className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('textStyle') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                    title="Text Color"
                >
                    <MdFormatColorText className="h-5 w-5" />
                </button>
                <div className="absolute hidden group-hover:block bg-white p-2 shadow-lg rounded z-10">
                    <input
                        type="color"
                        onInput={event => editor.chain().focus().setColor(event.target.value).run()}
                        value={editor.getAttributes('textStyle').color || '#000000'}
                        title="Text Color"
                        className="w-8 h-8 cursor-pointer"
                    />
                </div>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            {/* More formatting options */}


            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            {/* Clear formatting */}
            <button
                onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
                title="Clear formatting"
            >
                <FaEraser className="h-5 w-5" />
            </button>
        </div>
    );
};

const TextEditor = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            FontSize,
            Color,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 hover:underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg',
                },
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose max-w-none focus:outline-none p-4 min-h-[300px]',
            },
        },
    });

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <MenuBar editor={editor} />
            {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <div className="flex bg-white shadow-lg rounded-lg p-1 border border-gray-200">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`px-2 py-1 text-sm rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100 font-medium text-blue-600' : 'text-gray-700'}`}
                        >
                            <FaBold className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`px-2 py-1 text-sm rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100 font-medium text-blue-600' : 'text-gray-700'}`}
                        >
                            <FaItalic className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={`px-2 py-1 text-sm rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-100 font-medium text-blue-600' : 'text-gray-700'}`}
                        >
                            <FaUnderline className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => {
                                const previousUrl = editor.getAttributes('link').href;
                                const url = window.prompt('URL', previousUrl || 'https://');

                                if (url === null) return;
                                if (url === '') {
                                    editor.chain().focus().extendMarkRange('link').unsetLink().run();
                                    return;
                                }

                                editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                            }}
                            className={`px-2 py-1 text-sm rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-100 font-medium text-blue-600' : 'text-gray-700'}`}
                        >
                            <FaLink className="h-4 w-4" />
                        </button>
                    </div>
                </BubbleMenu>
            )}
            <EditorContent editor={editor} />
        </div>
    );
};

export default TextEditor;