"use client";

import Alunos from "@/components/aluno/page"; // ajuste o caminho se necessário

import { LayoutAdmin } from "@/layout";


import TableComponent from '../../components/dataDisplay/table/index.js'


const DATA_MOCK = [
		{
			"id": 1,
			"nome": "vitor melo",
			"idade": 19,
			"comum": "Taguatinga",
			"endereco": "qnl 01 bloco c",
			"created_at": "2025-08-23T19:55:33.147Z",
			"updated_at": "2025-08-23T19:55:33.147Z",
			"jornadas": []
		}
	]


const headers_table = ["id", "Nome", "Idade", "Comum", "Endereco", "Acao"]

export default function Page() {


  
    return (
        <>
        <LayoutAdmin>

            <TableComponent headers={headers_table} dataTable={DATA_MOCK}/>

        </LayoutAdmin>
        </>
    );
}
