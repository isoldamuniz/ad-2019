import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Pessoa({pessoa, editClick, deleteClick}) {
    
    const handleEditClick = () => {
        editClick(pessoa);
    }
    const handleRemoveClick = () => {
        deleteClick(pessoa);
    }
    
    return (
        <Row>
        <Col style={styles.infos}>
            <h6><strong>{pessoa.nome}</strong></h6>
            <p><strong>{pessoa.email}</strong></p>
        </Col>
        <Col style={{width:"20%", textAlign:"right"}}>
            <div>
                <i style={styles.buttons} className="material-icons" onClick={handleEditClick}>edit</i>
            </div>
            <div>
                <i style={styles.buttons} className="material-icons" onClick={handleRemoveClick}>delete</i>
            </div>
        </Col>
        </Row>
    )
}

const styles = {
    infos: {
        width: '80%',
    },
    buttons: {
        cursor: 'pointer',
        padding: "10px"
    }
    
}

