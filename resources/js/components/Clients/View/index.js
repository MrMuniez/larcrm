import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router';
import API from '../../../API';


export default function ClientView(){

    const {clientID} = useParams();

    const [client,setClient] = useState({});

    useEffect(()=>{
        API.get(`/clients/${clientID}`).then(res=>{
            if(res.status == 200){
                console.log(res.data);
            }
        })
    },[]);

    return (
        <>
            Podglad na klienta
        </>
    )
}