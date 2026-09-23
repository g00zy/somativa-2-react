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

      navigate('/principal');

    } 
    catch (erro) 
    {
      console.log(erro);

      if (erro.code === 'auth/email-already-in-use') 
      {
        setMensagem('Este e-mail já está cadastrado.');
      } 
      else if (erro.code === 'auth/weak-password') 
      {
        setMensagem('A senha deve ter pelo menos 6 caracteres.');
      } 
      else 
      {
        setMensagem('Não foi possível realizar o cadastro.');
      }
    }

  }

  return (
    <div className="page-shell">
      <div className="auth-card">
        <span className="badge">Cadastro</span>

        <h1 className="auth-title">Criar conta</h1>

        <p className="auth-subtitle">
          Cadastre seu usuário utilizando Firebase Authentication e salve
          seus dados complementares no Firestore.
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

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input
              className="form-input"
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sobrenome</label>
            <input
              className="form-input"
              type="text"
              placeholder="Seu sobrenome"
              value={sobrenome}
              onChange={(event) => setSobrenome(event.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Data de nascimento</label>
          <input
            className="form-input"
            type="date"
            value={nascimento}
            onChange={(event) => setNascimento(event.target.value)}
          />
        </div>

        <button className="auth-button" onClick={cadastrar}>
          Cadastrar
        </button>

        {mensagem && (
          <p className="message success">
            {mensagem}
          </p>
        )}

        <div className="auth-link">
          <Link to="/">Já possui cadastro? Fazer login</Link>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;