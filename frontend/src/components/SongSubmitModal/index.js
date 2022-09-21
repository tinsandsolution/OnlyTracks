import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SongSubmitForm from './SongSubmitForm';

function SongSubmitFormModal({song, setSong}) {
  const [showModal, setShowModal] = useState(false);
  // console.log(song)
  return (
    <>
      <div className='reg-nav-link' onClick={() => setShowModal(true)}>Upload</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SongSubmitForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default SongSubmitFormModal;
