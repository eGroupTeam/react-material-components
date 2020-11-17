import React, { FC } from 'react';
import SourceCKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@e-group/ckeditor5-build-classic';

type CodeBlockLanguageDefinition = { language: string; label: string };

/**
 * TODO: Need add all config types.
 * Read here for more detail.
 * https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
 */
export interface CKEditorProps {
  data?: string;
  onInit?: (editor: any) => void;
  onChange?: (editor: any) => void;
  config?: {
    toolbar?:
      | string[]
      | {
          items?: string[];
          viewportTopOffset?: number;
          shouldNotGroupWhenFull?: boolean;
        };
    alignment?: {
      options?: string[];
    };
    placeholder?: string;
    autosave?: {
      waitingTime?: number;
      save?: (editor: any) => Promise<any>;
    };
    balloonToolbar?: string[] | any;
    blockToolbar?: string[] | any;
    ckfinder?: {
      openerMethod?: string;
      options?: any;
      uploadUrl?: string;
    };
    cloudServices?: {
      bundleVersion?: string;
      tokenUrl?: string | (() => Promise<any>);
      uploadUrl?: string;
      webSocketUrl?: string;
    };
    codeBlock?: {
      indentSequence?: string;
      languages?: CodeBlockLanguageDefinition[];
    };
    exportPdf?: {
      converterOptions?: {
        format?: string;
        margin_top?: string;
        margin_bottom?: string;
        margin_right?: string;
        margin_left?: string;
        page_orientation?: string;
        header_html?: string;
        footer_html?: string;
        header_and_footer_css?: string;
        wait_for_network?: boolean;
        wait_time?: number;
      };
      converterUrl?: string;
      dataCallback?: (editor: any) => string;
      fileName?: string;
      stylesheets?: string[];
    };
    exportWord?: {
      converterOptions?: {
        format?: string;
        margin_top?: string;
        margin_bottom?: string;
        margin_right?: string;
        margin_left?: string;
        header?: string;
        footer?: string;
        comments?: string;
        suggestions?: string;
      };
      fileName?: string;
      converterUrl?: string;
      stylesheets?: string[];
    };
    removePlugins?: string[];
    drawio?: {
      autoEmbedMatcher: (url: string) => boolean;
      onCreateClick: () => void;
    };
    drawioEdit?: {
      onOpenClick: (event: any, editor: any) => void;
    };
    simpleUpload?: {
      uploadUrl: string;
      headers?: {
        [key: string]: string;
      };
      withCredentials?: boolean;
    };
  };
}

const CKEditor: FC<CKEditorProps> = (props) => {
  return <SourceCKEditor editor={ClassicEditor} {...props} />;
};

export default CKEditor;
