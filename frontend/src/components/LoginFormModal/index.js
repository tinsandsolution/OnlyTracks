import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'

function LoginFormModal({isSplash}) {
  const [showModal, setShowModal] = useState(false);
  // console.log(isSplash)
  return (
    <>
      <button className="login-button" onClick={() => setShowModal(true)}>{isSplash === "true" ? "Upload Your Own" : "Log In"}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
