import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../Firebase';

function Login() 
{

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function acessar() 
  {

    try 
    {

      await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

      navigate('/principal');

    } 
    catch (erro) 
    {

      console.log(erro);

      setMensagem(
        'Usuário não cadastrado ou dados incorretos.'
      );

    }

  }

  return (
    <div>

      <h1>Login</h1>

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

      <button onClick={acessar}>
        Acessar
      </button>

      <p>{mensagem}</p>

      <Link to="/cadastro">
        Criar cadastro
      </Link>

    </div>
  );
}

export default Login;