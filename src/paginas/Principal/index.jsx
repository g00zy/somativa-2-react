import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { onAuthStateChanged, signOut } from 'firebase/auth';

import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '../../Firebase';

function Principal() 
{

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => 
  {
    const cancelarObservacao =
      onAuthStateChanged(
        auth,
        async (usuarioAutenticado) => 
        {

          if (!usuarioAutenticado) 
          {

            navigate('/');

            return;

          }

          const referencia =
            doc(
              db,
              'usuarios',
              usuarioAutenticado.uid
            );

          const documento =
            await getDoc(referencia);

          if (documento.exists()) 
          {

            setUsuario(documento.data());

          }

          else 
          {
            setUsuario(
            {
              nome: 'Não encontrado',
              sobrenome: 'Não encontrado',
              nascimento: 'Não encontrado'
            });
          }

          setCarregando(false);
        }
      );

    return () =>
      cancelarObservacao();

  }, [navigate]);

  async function sair() 
  {

    await signOut(auth);

    navigate('/');

  }

  return (
    <div className="page-shell">
      <div className="auth-card">
        <span className="badge">Principal</span>

        <h1 className="auth-title">Perfil do usuário</h1>

        <p className="auth-subtitle">
          Estes são os dados recuperados do Firestore com base no UID do
          usuário autenticado no Firebase Authentication.
        </p>

        {usuario && (
          <div className="profile-box">
            <div className="info-card">
              <span className="info-label">Nome</span>
              <span className="info-value">{usuario.nome}</span>
            </div>

            <div className="info-card">
              <span className="info-label">Sobrenome</span>
              <span className="info-value">{usuario.sobrenome}</span>
            </div>

            <div className="info-card">
              <span className="info-label">Data de nascimento</span>
              <span className="info-value">{usuario.nascimento}</span>
            </div>
          </div>
        )}

        <div className="actions">
          <button
            className="auth-button secondary"
            onClick={() => navigate('/')}
          >
            Voltar ao login
          </button>

          <button className="auth-button" onClick={sair}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Principal;