import React from 'react';

export default function InsertButton({click}) {
    
    const handleClick = () => {
        click()
    }
    
    return (
        <div>
            <a className="btn" onClick={handleClick}><i className="material-icons left">add</i>Cadastrar</a>
        </div>
    )
}
