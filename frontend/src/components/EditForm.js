import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#modal');

export default function EditForm({ pessoa, onSave, onClose}) {

    const [disableBtnFlag, setDisableBtnFlag] = useState(true);

    const [nome, setNome] = useState(pessoa.nome);
    const [email, setEmail] = useState(pessoa.email);

    const [errorMsg, setErrorMsg] = useState('');

    const handleNomeInput = (event) => {
        setNome(event.target.value);
    }
    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    }
    useEffect(() => {
        if(nome!== '' && email!==''){
            setDisableBtnFlag(false);
        }else{
            setDisableBtnFlag(true)
        }
    }, [nome, email])
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        let pessoa={};

        if(nome!=='' && email!==''){
            pessoa = {
                "nome": nome,
                "email": email,
            };
            
            onSave(pessoa);
        }        
    };

    const handleClose = ()=>{
        onClose(false);
    };

    return (
        <div>
            <Modal isOpen={true}>

                <div style={styles.flexRow}>
                    <span style={styles.title}>Editar pessoa</span>
                    <button className='waves-effect waves-lights btn red dark-4' onClick={handleClose}>x</button>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className='input-field'>
                        <input id='inputNome' type='text' value={nome} onChange={handleNomeInput}/>
                        <label className='active' htmlFor='inputNome'>
                            Nome: 
                        </label>
                    </div>
                    <div className='input-field'>
                        <input id='inputEmail' type='text' value={email} onChange={handleEmailInput}/>
                        <label className='active' htmlFor='inputEmail'>
                            E-mail: 
                        </label>
                    </div>

                    <div style={styles.flexRow}>
                        <button disabled={disableBtnFlag} className='waves-effect waves-light btn'>
                            Salvar
                        </button>
                        <span style={styles.errorMsg}>{errorMsg}</span>
                    </div>
                </form>
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
