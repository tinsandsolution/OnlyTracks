import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import PlaylistCreateForm from './PlaylistCreateForm';

function PlaylistCreateFormModal({song, setSong}) {
  const [showModal, setShowModal] = useState(false);
  // console.log(song)
  return (
    <>
      <button className='create-playlist' onClick={() => setShowModal(true)} >Create Playlist</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PlaylistCreateForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default PlaylistCreateFormModal;
