import React from 'react';

export default function SorteioButton({click}) {
    
    const handleClick = () => {
        click();
    }
    
    return (
        <div>
            <a className="btn" onClick={handleClick}><i className="material-icons left">import_export</i>Sortear</a>
        </div>
    )
}
