import React from 'react';
import { storiesOf } from '@storybook/react';

import CKEditor from '@e-group/material-lab/CKEditor';
import Fade from '@material-ui/core/Fade'
import DrawioIframe from './DrawioIframe'

storiesOf('CKEditor', module)
  .add(
    'default',
    () => (
      <CKEditor data="<p>Hello from CKEditor 5!</p>"/>
    ),
  )
  .add(
    'with drawio',
    () => {
      const Demo = () => {
        const iframeEl = React.useRef();
        const [iframeUrl, setIframeUrl] = React.useState();
        const [displayIframe, setDisplayIframe] = React.useState(false);

        const handleNewDrawio = (e, editor) => {
          const iframe = iframeEl.current;
          const receive = async e => {
            if (typeof e.data === 'undefined') return;
            const msg = JSON.parse(e.data);
            switch (msg.event) {
              case 'init':
                iframe.contentWindow.postMessage(
                  JSON.stringify({
                    action: 'load',
                    autosave: 1,
                    xml: ''
                  }),
                  '*'
                );
                break;
              case 'exit':
                setDisplayIframe(false);
                setIframeUrl('');
                window.removeEventListener('message', receive);
                break;
              default:
                break;
            }
          };
          setDisplayIframe(true);
          setIframeUrl('https://www.draw.io/?embed=1&ui=atlas&spin=1&proto=json&lang=zh-tw');
          window.addEventListener('message', receive);
        };
        // const handleEditDrawio = async (e, editor) => {
        //   const drawioSrc = editor.model.document.selection
        //     .getSelectedElement()
        //     .getAttribute('src');
        //   const drawioHtml = await apis
        //     .fetchGetDrawioHtml(drawioSrc)
        //     .then(res => res.data);
        //   const drawioId = drawioSrc
        //     .replace('.html', '')
        //     .split('/')
        //     .pop()
        //     .split('_')
        //     .pop();
        //   const iframe = iframeEl.current;
      
        //   const receive = e => {
        //     if (typeof e.data === 'undefined') return;
        //     const msg = JSON.parse(e.data);
        //     switch (msg.event) {
        //       case 'init':
        //         initDrawioEditor(iframe, drawioHtml);
        //         break;
        //       case 'autosave':
        //         saveing(iframe);
        //         updateDrawioByPatch({
        //           iframe,
        //           editor,
        //           drawioId,
        //           xml: msg.xml
        //         });
        //         break;
        //       case 'exit':
        //         setDisplayIframe(false);
        //         setIframeUrl('');
        //         window.removeEventListener('message', receive);
        //         break;
        //       default:
        //         break;
        //     }
        //   };
      
        //   setDisplayIframe(true);
        //   setIframeUrl(DRAWIO_EDITOR_URL);
        //   window.addEventListener('message', receive);
        // };
        const editorConfiguration = {
          toolbar: [ 'bold', 'italic', 'drawio' ],
          drawio: {
            autoEmbedMatcher: url => url.indexOf("https://edstest-bucket.s3-ap-northeast-1.amazonaws.com") !== -1,
            onCreateClick: handleNewDrawio
          },
          // drawioEdit: {
          //   onOpenClick: handleEditDrawio
          // }
        };
        return (
          <>
            <Fade in={displayIframe}>
              <DrawioIframe src={iframeUrl} ref={iframeEl} />
            </Fade>
            <CKEditor
              data="<p>Hello from CKEditor 5!</p>"
              config={editorConfiguration}
            />
          </>
        )
      }
      return <Demo />
    },
  )
