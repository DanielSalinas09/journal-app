import React from 'react'
import { JournalEntries } from './JournalEntries'
import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../../actions/auth';
import { newNoteAction, noteLogout } from '../../actions/notes';

export const Sidebar = () => {

    const {name} = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const handleLogout=(e)=>{
        e.preventDefault();
        dispatch(startLogout());
        dispatch(noteLogout());

    }
    const handleAddNew=()=>{
        dispatch(newNoteAction());
    }

    return (
        <aside className='journal__sidebar'>
            <div className='journal__sidebar-navbar'>
                <h3 className='mt-5'>
                    <i className='far fa-moon'></i>
                    <span> {name}</span>

                </h3>
                <button className='btn' onClick={handleLogout}>
                    Cerrar sesion
                </button>
            </div>
            <div className='journal__new-entry' onClick={handleAddNew}>
                <i className='far fa-calendar-plus fa-5x'></i>
                <p className='mt-5'>Nueva entrada</p>
            </div>
            <JournalEntries />
        </aside>
    )
}
