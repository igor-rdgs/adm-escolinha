import {useState, useEffect} from 'react'
import api from '../../service/index.js'



function useAlunos() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [error, setError] = useState(false)

    const updateAluno = async (id) => {
        
    }

    const deleteAluno = async (id) => {
       
    }

    const getByAluno = async (id) => {
       
    }


    return {
        loading,
        data, 
        error,
       updateAluno,
       deleteAluno,
       getByAluno
    }


}

export default useAlunos

