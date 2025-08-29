
"use client";
import {LayoutAdmin} from '../../layout'

import {useAlunos} from '../../hooks'

export default function Alunos() {

  const {loading, data, error, reload} = useAlunos()


  if(loading) {
    return <>
      Carregando
    </>
  }
 

   if(error) {
    return <>
      erro ao carregar pagina
      <button onClick={reload}>
        carregar novamente
      </button>
    </>
  }
 


  return (
    <LayoutAdmin>
      {console.log(data, '----xw')}
        {
          data && data.results && <>
            <div style={{display: "flex", flexDirection: "column"}} >
            {
              data.results.map(e => <div>
                {e.name}
              </div>)
            }
            </div>
          </>
        }
    </LayoutAdmin>
 
  );
}
