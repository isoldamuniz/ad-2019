import React, { useState, useEffect } from 'react';

import { Container, Table } from 'react-bootstrap';

import api from './helpers/api';

import Grid from './components/Grid';
import Title from './components/Title';
import InsertButton from './components/InsertButton';
import SorteioButton from './components/SorteioButton';
import InsertForm from './components/InsertForm';
import EditForm from './components/EditForm';

export default function App() {

  const [pessoas, setPessoas] = useState([]);
  const [showFormFlag, setShowFormFlag] = useState(false);
  const [showEditFormFlag, setShowEditFormFlag] = useState(false);
  const [pessoaToEdit, setPessoaToEdit] = useState({});

  async function getPessoas(){
    return await api.pessoas();
  }

  const handleOpenForm = () => {
    setShowFormFlag(true);
  }
  const handleFormClose = () => {
    setShowFormFlag(false);
  }
  const handleOpenEditForm = (pessoa) => {
    setPessoaToEdit(pessoa);
    setShowEditFormFlag(true);
  }
  const handleEditFormClose = () => {
    setShowEditFormFlag(false);
  }
  const realizarSorteio = () => {

    let pessoasShuffled = [];

    function shuffle(array) {
      var m = array.length, t, i;
    
      // While there remain elements to shuffle…
      while (m) {
    
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
    
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
    
      return array;
    }

    pessoasShuffled = shuffle(pessoas);
    console.log(pessoasShuffled);

    pessoasShuffled.forEach( pessoa => {
      console.log(pessoa);
    });

  }

  const insertPessoa = async (newPessoa) => {
    await api.register(newPessoa);
    getPessoas();
    setShowFormFlag(false);
  }

  const editPessoa = async (pessoaToSave) => {
    await api.update(pessoaToEdit._id, pessoaToSave);
    getPessoas();
    setShowEditFormFlag(false);
  }

  const deletePessoa = async (pessoaToDelete) => {
    await api.remove(pessoaToDelete._id);
    getPessoas();
  }

  useEffect(() => {
    getPessoas().then(response =>{
      setPessoas(response.data);
    });
  }, [pessoas]);

  return(
    <>
    <Container>
      <Table borderless>
        <tbody>
          <tr>
            <td style={{width:"60%"}}><Title /></td>
            <td style={{textAlign:"right"}}><InsertButton click={handleOpenForm} /></td>
            <td style={{textAlign:"right"}}><SorteioButton click={realizarSorteio} /></td>
          </tr>
          <tr>
            <td colSpan="3">
              {showEditFormFlag && <EditForm pessoa={pessoaToEdit} onSave={editPessoa} onClose={handleEditFormClose}/>}
              {showFormFlag && <InsertForm onSave={insertPessoa} onClose={handleFormClose}/>}
              <Grid fluid={true} toEdit={handleOpenEditForm} toDelete={deletePessoa} pessoas={pessoas.length!==0 ? pessoas : []}/>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
    </>
    )
}

const styles = {
  main:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid'
  },
  header:{
    display: 'flex',
    border:'1px solid',
    width: '100%',
    
  },
  button: {
    marginRight: '10px',
  }
}