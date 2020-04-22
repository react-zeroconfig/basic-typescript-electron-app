import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { Title } from './components/Title';
import { RESTART_CHANNEL, UPDATE_CHANNEL, UpdateMessage } from './update';

function App() {
  useEffect(() => {
    function updateHandler(event: Event, message: UpdateMessage) {
      console.log(message);

      switch (message.type) {
        case 'update-ready':
          ipcRenderer.send(RESTART_CHANNEL);
          break;
      }
    }

    ipcRenderer.addListener(UPDATE_CHANNEL, updateHandler);

    return () => {
      ipcRenderer.removeListener(UPDATE_CHANNEL, updateHandler);
    };
  }, []);

  return <Title text="Hello World!" />;
}

render(<App />, document.querySelector('#app'));
