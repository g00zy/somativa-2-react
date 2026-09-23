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
    <div className="page-shell">
      <div className="auth-card">
        <span className="badge">Login</span>

        <h1 className="auth-title">Bem-vindo de volta</h1>

        <p className="auth-subtitle">
          Faça login com seu e-mail e senha para acessar a página principal
          e visualizar seus dados cadastrados.
        </p>

        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input
            className="form-input"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Senha</label>
          <input
            className="form-input"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
        </div>

        <button className="auth-button" onClick={acessar}>
          Acessar
        </button>

        {mensagem && (
          <p className="message error">
            {mensagem}
          </p>
        )}

        <div className="auth-link">
          <Link to="/cadastro">Criar cadastro</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;