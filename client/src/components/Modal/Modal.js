import axios from 'axios';
import './Modal.scss';

function Modal(props) {
    const handleCancel = (e) => {
        e.preventDefault();
        props.setModalStatus(!props.modalStatus);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:8080/events/${props.match.params.eventId}`, { withCredentials: true})
            .then((res)=> {
                props.setModalStatus(!props.modalStatus);
                props.history.goBack();
            })
            .catch((err) => {
                console.log(err.response)
            });  
    };
    
    return (
        <div className="modal" onClick={handleCancel}>
            <div className="modal__close-box">
                <span className="modal__close">&#215;</span>
            </div>
            <div className="modal__window">
                <div className="modal__message">Are you sure you want to delete this event?</div>
                <div className="modal__actions">
                    <button className="modal__cancel" onClick={handleCancel}>Cancel</button>
                    <button className="modal__confirm" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
     )
}

export default Modal;