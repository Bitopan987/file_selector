import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import useDrivePicker from 'react-google-drive-picker';
import DropboxChooser from 'react-dropbox-chooser';

function App() {
  const {
    REACT_APP_DROPBOX_APP_KEY,
    REACT_APP_GOOGLE_DEVELOPER_KEY,
    REACT_APP_GOOGLE_CLIENT_ID,
  } = process.env;

  const [openPicker, data] = useDrivePicker();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState('Google Drive');

  const handleOpenPicker = () => {
    openPicker({
      clientId: REACT_APP_GOOGLE_CLIENT_ID,
      developerKey: REACT_APP_GOOGLE_DEVELOPER_KEY,
      viewId: 'DOCS',
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
    });
  };

  useEffect(() => {
    if (data) {
      const filesArray = data.docs.map((val) => val.url);
      setSelectedFiles(filesArray);
      setSelectedDrive('Google Drive');
    }
  }, [data]);

  function handleSuccess(files) {
    const filesArray = files.map((val) => val.link);
    setSelectedFiles(filesArray);
    setSelectedDrive('DropBox');
  }

  return (
    <section className="mt-16">
      <h1 className="text-blue-400 pb-4 text-4xl center text-center my-4">
        Upload or choose files from :
      </h1>
      <div className="my6 gap-7 text-center flex justify-center">
        <Button
          onClick={() => handleOpenPicker()}
          variant="contained"
          color="primary"
        >
          Google Drive
        </Button>

        <DropboxChooser
          appKey={REACT_APP_DROPBOX_APP_KEY}
          success={handleSuccess}
          cancel={() => console.log('closed')}
        >
          <Button
            className="m-8"
            onClick={() => handleOpenPicker()}
            variant="contained"
            color="primary"
          >
            Drop Box
          </Button>
        </DropboxChooser>
      </div>

      {selectedFiles.length ? (
        <div className="m-auto mt-8 w-1/2 border-t pt-8">
          <h2 className="text-2xl mb-4">
            {`You selected ${selectedFiles.length} items from ${selectedDrive}`}{' '}
          </h2>
          <ul>
            {selectedFiles.map((link) => (
              <li>
                <a
                  href={link}
                  target="_blank "
                  className="text-blue-400 hover:underline cursor-pointer"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
    </section>
  );
}

export default App;
