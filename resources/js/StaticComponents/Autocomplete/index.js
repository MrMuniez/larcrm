import React, { useState, useEffect } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import './autocomplete.css';

export default function Autocomplete({ value, onChange, onSelect, data, label, placeholder }) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {

    },[]);



    return (
        <>
            <FormGroup>
                <Label for="autocomplete_input">{label}</Label>
                <Input autoComplete='off' value={value ? value : ''} name='autocomplete_input' id='autocomplete_input' onChange={onChange} placeholder={placeholder ? placeholder : 'Wyszukaj'} />
                <div className='autocomplete_container'>

                    {value.length >= 3 ?
                        <ul>
                        {
                            data.length > 0 ?
                                data.map((val, ind) => {
                                    return <li key={ind} className='item' onClick={() => { onSelect(val) }}>{val.name} {val.phone.length > 0 ? "Tel:"+val.phone : ''}</li>
                                }) :
                                <li className='notFound'> Nie znaleziono : {value}</li>
                        }
                    </ul>: ''}


                </div>
            </FormGroup>

        </>
    )

}