import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#modal');

export default function SorteioForm({ onClose, submitMsg}) {

    const handleClose = ()=>{
        onClose(false);
    };

    return (
        <div>
            <Modal isOpen={true}>
                <div style={styles.flexRow}>
                    <span style={styles.title}></span>
                    <button className='waves-effect waves-lights btn red dark-4' onClick={handleClose}>x</button>
                </div>
                {submitMsg !== '' ? (<div>Sorteando e enviando...</div>) : (<div>{submitMsg}</div>) }
            </Modal>
        </div>
    )
}

const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
    },
    title: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
    },
    errorMsg: {
        color: 'red',
        fontWeight: 'bold',
    },
    
};
