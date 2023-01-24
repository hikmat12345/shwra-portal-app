import { useReducer } from 'react';

type Action = {
    type: ActionKind,
    payload: any 
}
  
enum ActionKind {
    OpenDialog = 'OPEN_DIALOG',
    CloseDialog = 'CLOSE_DIALOG'
}
  
const initialState: boolean = false;

function reducer(state: boolean, action: Action) {
    const { type, payload } = action;
    switch (type) {
      case ActionKind.OpenDialog:
        return true
      case ActionKind.CloseDialog:
        return false
      default:
        throw new Error(`Unhandled action type: ${type}`);
    }
}


export default function useDialog(){

  const [ open , dispatch ] = useReducer(reducer, initialState);



  function openDialog() {
    dispatch({
        type: ActionKind.OpenDialog,
        payload: null
    })
  }


  function closeDialog() {
    dispatch({
      type: ActionKind.CloseDialog,
      payload: null
    })
  }

  return {
    open,

    openDialog,
    closeDialog
  }

}