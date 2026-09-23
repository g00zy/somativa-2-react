import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';

import { auth, db} from '../../Firebase';

function Cadastro() 
{

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nascimento, setNascimento] = useState('');

  const [mensagem, setMensagem] = useState('');

  async function cadastrar() 
  {
    try 
    {
      const credencial =
        await createUserWithEmailAndPassword(
          auth,
          email,
          senha
        );

      const usuario = credencial.user;

      await setDoc(
        doc(db, 'usuarios', usuario.uid),
        {
          uid: usuario.uid,
          email: email,
          nome: nome,
          sobrenome: sobrenome,
          nascimento: nascimento
        }
      );

      setMensagem('Usuário cadastrado com sucesso!');

      navigate('/principal');

    } 
    catch (erro) 
    {

      console.log(erro);

      setMensagem(
        'Não foi possível realizar o cadastro.'
      );

    }

  }

  return (
    <div>

      <h1>Cadastro</h1>

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
      />

      <br />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(event) =>
          setSenha(event.target.value)
        }
      />

      <br />

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(event) =>
          setNome(event.target.value)
        }
      />

      <br />

      <input
        type="text"
        placeholder="Sobrenome"
        value={sobrenome}
        onChange={(event) =>
          setSobrenome(event.target.value)
        }
      />

      <br />

      <input
        type="date"
        value={nascimento}
        onChange={(event) =>
          setNascimento(event.target.value)
        }
      />

      <br />

      <button onClick={cadastrar}>
        Cadastrar
      </button>

      <p>{mensagem}</p>

      <Link to="/">
        Já possui cadastro? Fazer login
      </Link>

    </div>
  );
}

export default Cadastro;