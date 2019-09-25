import React from 'react'
import SourceCKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@e-group/ckeditor5-build-classic';

const CKEditor = props => {
  return (
    <SourceCKEditor
      editor={ ClassicEditor }
      {...props}
    />
  )
}

export default CKEditor
