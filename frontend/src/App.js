import React, { useState, useEffect } from 'react';

import { Container, Table } from 'react-bootstrap';

import api from './helpers/api';

import Grid from './components/Grid';
import Title from './components/Title';
import InsertButton from './components/InsertButton';
import SorteioButton from './components/SorteioButton';
import InsertForm from './components/InsertForm';
import SorteioForm from './components/SorteioForm';
import EditForm from './components/EditForm';

export default function App() {

  const [pessoas, setPessoas] = useState([]);
  const [showFormFlag, setShowFormFlag] = useState(false);
  const [showEditFormFlag, setShowEditFormFlag] = useState(false);
  const [pessoaToEdit, setPessoaToEdit] = useState({});
  const [showFormSorteioFlag, setShowFormSorteioFlag] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');

  async function getPessoas(){
    return await api.pessoas();
  }

  const handleOpenForm = () => {
    setShowFormFlag(true);
  }
  const handleFormClose = () => {
    setShowFormFlag(false);
  }
  const handleFormSorteioClose = () => {
    setShowFormSorteioFlag(false);
  }
  const handleOpenEditForm = (pessoa) => {
    setPessoaToEdit(pessoa);
    setShowEditFormFlag(true);
  }
  const handleEditFormClose = () => {
    setShowEditFormFlag(false);
  }

  const realizarSorteio = async () => {
    setShowFormSorteioFlag(true);

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

    let rascunho = pessoasShuffled.map((pessoa, index)=>{
      if(index === pessoasShuffled.length - 1 ){
        return {
          ...pessoa,
          amigo: pessoasShuffled[0],
        }
      }else{
        return{
          ...pessoa,
          amigo: pessoasShuffled[index+1],
        }
      }
    });
      
    rascunho.forEach(async (pessoa) => {
      setTimeout(async function(){ await api.update(pessoa._id, pessoa); }, 500);
    });
    await api.submit();
    setSubmitMsg('Os amigos secretos foram enviados para os emails.');

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
              {showFormSorteioFlag && <SorteioForm onClose={handleFormSorteioClose} submitMsg={submitMsg}/>}
              <Grid fluid={true} toEdit={handleOpenEditForm} toDelete={deletePessoa} pessoas={pessoas.length!==0 ? pessoas : []}/>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
    </>
    )
}

