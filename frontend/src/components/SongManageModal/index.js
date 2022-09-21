import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SongManageForm from './SongManageForm';

function SongManageFormModal({song, setSong}) {
  const [showModal, setShowModal] = useState(false);
  // console.log(song)
  return (
    <>
      <button className="edit-song-button" onClick={() => setShowModal(true)}>Manage Track</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SongManageForm song={song} setShowModal={setShowModal} setSong={setSong}/>
        </Modal>
      )}
    </>
  );
}

export default SongManageFormModal;
