import React from 'react';

import Pessoa from './Pessoa';

export default function Grid({toDelete, toEdit, pessoas}) {

    let grid = Object.assign([], pessoas);

    const handleEdit = (pessoa) => {
        toEdit(pessoa);
    }
    const handleDelete = (pessoa) => {
        toDelete(pessoa);
    }

    return(
        <div>
          {grid.map((pessoa) => {
            return (
                <div key={pessoa._id} style={styles.card}>
                    <Pessoa editClick={handleEdit} deleteClick={handleDelete} pessoa={pessoa}/>
                </div>
            )
          })}
        </div>
    )
}

const styles = {
    card: {
        backgroundColor: '#e6faf7',
        borderRadius: '20px',
        alignSelf: "center"
    }
};


