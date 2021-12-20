import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NodeAppBar } from './NodeAppBar'
import { useForm } from './../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const {active:note} = useSelector(state => state.notes);
    const dispatch = useDispatch();
    
    const [formvalue,handleInputChange,reset]=useForm(note);

    const {body,title,id}=formvalue;
    const activeId= useRef(note.id);
    
    useEffect(() => {
        if (note.id!==activeId.current) {
            reset(note);
            activeId.current=note.id
            
        }
    }, [reset,note])
    useEffect(() => {
        dispatch(activeNote(formvalue.id,{...formvalue})) 
    }, [formvalue,dispatch]);
    const handleDelete=()=>{
        dispatch(startDeleting(id));
    }

    return (
        <div className='notes__main-content'>
            <NodeAppBar />
            <div className='notes__content'>
                <input 
                    type='text'
                    placeholder='Titulo'
                    className='notes__title-input'
                    autoComplete='off'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder='Que paso hoy!!'
                    className='notes__textarea'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>
                {
                    (note.url)
                    &&(<div className='notes__image'>
                    <img 
                        src={note.url}
                        alt='imagen'
                    />
                    </div>)
                }
            </div>
            <button className='btn btn-danger' onClick={handleDelete}>
                Borrar
            </button>
        </div>
    )
}
