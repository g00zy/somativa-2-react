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

  if (carregando) 
  {

    return (
      <p>
        Carregando...
      </p>
    );

  }

  return (
    <div>

      <h1>Principal</h1>

      {usuario && (
        <div>

          <p>
            Nome: {usuario.nome}
          </p>

          <p>
            Sobrenome: {usuario.sobrenome}
          </p>

          <p>
            Data de nascimento:
            {' '}
            {usuario.nascimento}
          </p>

        </div>
      )}

      <button onClick={sair}>
        Sair
      </button>

    </div>
  );
}

export default Principal;