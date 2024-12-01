import React, {useState} from 'react';
import Modal from "react-modal";


export const createTaskModal=()=>{

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const modalContent = (
        <div>
            <h2>Заголовок модального окна</h2>
            <p>Текст модального окна</p>
            <button onClick={closeModal}>Закрыть</button>
        </div>
    );

    return(
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
               appElement={document.getElementById("root")}>
            {modalContent}
        </Modal>
    )
}




