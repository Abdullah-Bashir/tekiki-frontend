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
import { FaBold, FaItalic, FaUnderline, FaLink, FaUndo, FaRedo, FaStrikethrough } from 'react-icons/fa';
import { MdFormatColorText } from 'react-icons/md';
import { BiFontSize } from 'react-icons/bi';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const fontSizeOptions = [
    { value: '12px', label: 'Small' },
    { value: '16px', label: 'Normal' },
    { value: '20px', label: 'Large' },
    { value: '24px', label: 'XL' },
    { value: '32px', label: 'XXL' },
  ];

  const handleButtonClick = (action) => (e) => {
    e.preventDefault();
    action();
  };

  return (
    <div className="flex flex-wrap gap-1 mb-2 border-b pb-2 items-center">
      <button
        onClick={handleButtonClick(() => editor.chain().focus().undo().run())}
        disabled={!editor.can().undo()}
        className={`p-1.5 rounded hover:bg-gray-100 ${!editor.can().undo() ? 'text-gray-400' : 'text-gray-700'}`}
        title="Undo"
      >
        <FaUndo className="h-5 w-5" />
      </button>
      <button
        onClick={handleButtonClick(() => editor.chain().focus().redo().run())}
        disabled={!editor.can().redo()}
        className={`p-1.5 rounded hover:bg-gray-100 ${!editor.can().redo() ? 'text-gray-400' : 'text-gray-700'}`}
        title="Redo"
      >
        <FaRedo className="h-5 w-5" />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      <div className="flex items-center gap-1">
        <BiFontSize className="h-5 w-5 text-gray-700" />
        <select
          value={editor.getAttributes('textStyle').fontSize || '16px'}
          onChange={(e) => {
            const size = e.target.value;
            size === '16px' 
              ? editor.chain().focus().unsetFontSize().run()
              : editor.chain().focus().setFontSize(size).run();
          }}
          className="p-1 text-sm border rounded bg-white hover:bg-gray-50"
        >
          {fontSizeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {[
        { icon: <FaBold className="h-5 w-5" />, action: 'toggleBold', title: 'Bold' },
        { icon: <FaItalic className="h-5 w-5" />, action: 'toggleItalic', title: 'Italic' },
        { icon: <FaUnderline className="h-5 w-5" />, action: 'toggleUnderline', title: 'Underline' },
        { icon: <FaStrikethrough className="h-5 w-5" />, action: 'toggleStrike', title: 'Strikethrough' },
      ].map((btn) => (
        <button
          key={btn.title}
          onClick={handleButtonClick(() => editor.chain().focus()[btn.action]().run())}
          className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive(btn.action.replace('toggle', '').toLowerCase()) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          title={btn.title}
        >
          {btn.icon}
        </button>
      ))}

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      <button
        onClick={handleButtonClick(() => {
          const previousUrl = editor.getAttributes('link').href;
          const url = window.prompt('URL', previousUrl || 'https://');
          if (url === null) return;
          url === ''
            ? editor.chain().focus().extendMarkRange('link').unsetLink().run()
            : editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        })}
        className={`p-1.5 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
        title="Link"
      >
        <FaLink className="h-5 w-5" />
      </button>

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
            onInput={e => editor.chain().focus().setColor(e.target.value).run()}
            value={editor.getAttributes('textStyle').color || '#000000'}
            className="w-8 h-8 cursor-pointer"
          />
        </div>
      </div>
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
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-blue-500 hover:underline' },
      }),
      Image.configure({ HTMLAttributes: { class: 'rounded-lg' } }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
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
            {[
              { icon: <FaBold className="h-4 w-4" />, action: 'toggleBold' },
              { icon: <FaItalic className="h-4 w-4" />, action: 'toggleItalic' },
              { icon: <FaUnderline className="h-4 w-4" />, action: 'toggleUnderline' },
              { icon: <FaLink className="h-4 w-4" />, action: 'setLink' },
            ].map((btn) => (
              <button
                key={btn.action}
                onClick={(e) => {
                  e.preventDefault();
                  if (btn.action === 'setLink') {
                    const previousUrl = editor.getAttributes('link').href;
                    const url = window.prompt('URL', previousUrl || 'https://');
                    if (url === null) return;
                    url === ''
                      ? editor.chain().focus().extendMarkRange('link').unsetLink().run()
                      : editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                  } else {
                    editor.chain().focus()[btn.action]().run();
                  }
                }}
                className={`px-2 py-1 text-sm rounded hover:bg-gray-100 ${editor.isActive(btn.action.replace('toggle', '').toLowerCase()) ? 'bg-gray-100 font-medium text-blue-600' : 'text-gray-700'}`}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;