import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Dialog } from '../story/types'

interface ChatModalProps {
  isOpen: boolean
  onRequestClose: () => void
  dialog: Dialog | null
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onRequestClose, dialog }) => {
  if (!dialog) return null

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Диалог с {dialog.company}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='chat-container'>
          {dialog.comments.map((comment, index) => (
            <div key={index} className={`chat-message ${comment.author}`}>
              <strong>{comment.author}:</strong> {comment.text}
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onRequestClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ChatModal
