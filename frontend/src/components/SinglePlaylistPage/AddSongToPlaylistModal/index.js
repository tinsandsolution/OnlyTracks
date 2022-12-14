import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
// import PlaylistCreateForm from './PlaylistCreateForm';
import './AddSongToPlaylist.css'
import AddSongToPlaylistForm from './AddSongToPlaylistForm';

function AddSongToPlaylistModal({playlistId}) {
  const [showModal, setShowModal] = useState(false);
  // console.log(song)
  return (
    <>
      <button className='create-playlist add-songs-to-playlist' onClick={() => setShowModal(true)} >Add Songs</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddSongToPlaylistForm setShowModal={setShowModal} playlistId={playlistId}/>
        </Modal>
      )}
    </>
  );
}

export default AddSongToPlaylistModal;
