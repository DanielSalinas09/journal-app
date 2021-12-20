import Swal from 'sweetalert2'
import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const newNoteAction=()=>{
    return async(dispatch,getState)=>{
        const uid=getState().auth.uid;
        const newNote={
            title:'',
            body:'',
            date:new Date().getTime()
        }
        const doc =await db.collection(`${uid}/journal/notes`).add(newNote);
        console.log(doc);
        dispatch(activeNote(doc.id,newNote));
        dispatch(addNewNote(doc.id,newNote))
    }
}

export const activeNote=(id,note)=>{
    return{
        type:types.notesActive,
        payload:{
            id,
            ...note
        }

    }
}
export const addNewNote=(id,note)=>{
    return {
        type:types.notesAddNew,
        payload:{
            id,...note
        }
    }

}
export const startLoadingNotes=(uid)=>{
    return async(dispatch)=>{
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }

}
export const setNotes=(notes)=>{
    return {
        type:types.notesLoad,
        payload:notes
    }
}
export const startSaveNote=(note)=>{
    return async(dispatch,getState)=>{
        const {uid}= getState().auth;
        if(!note.url){
            delete note.url
        }
        const noteFireStore={...note};
        delete noteFireStore.id;
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteFireStore);
        dispatch(refreshNote(note.id,note));
        Swal.fire('Saved',note.title,'success')
    }
}
export const refreshNote=(id,note)=>{
    return {
        type:types.notesUpdate,
        payload:{
            id,
            note
        }
    }

}
export const startUploading=(file)=>{
    return async(dispatch,getState)=>{
        const {active:activeNote}=getState().notes;

        Swal.fire({title:'Uploading...',text:'Espere por favor', allowOutsideClick:false, didOpen:()=>{
            Swal.showLoading();
        }  })
        const fileUrl= await fileUpload(file);
        activeNote.url=fileUrl;
        dispatch(startSaveNote(activeNote))
        Swal.close();

    }
}
export const startDeleting=(id)=>{
    return async(dispatch,getState)=>{

        const uid=getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch(deleteNote(id));
        Swal.fire('Nota Borrada','La nota se borro correctamente','error')

    }
}
export const deleteNote=(id)=>{
    return {
        type:types.notesDelete,
        payload:id
    }

}
export const noteLogout=()=>{
    return {
        type:types.notesLogoutCleaning
        
    }
}
