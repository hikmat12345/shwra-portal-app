import { useReducer } from 'react';
import { keyBy, merge, values } from 'lodash';

type Action = {
  type: ActionKind;
  payload: any;
};

enum ActionKind {
  AddFile = 'ADD_FILE',
  RemoveFile = 'REMOVE_FILE',
  ClearFile = 'CLEAR_FILE'
}

type State = File[];

const initialState: State = [];

function reducer(state: State, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.AddFile:
      if (state.length === 0) {
        return payload;
      }

      const merged = merge(keyBy(state, 'name'), keyBy(payload, 'name'));

      const files = values(merged);

      return files;

    case ActionKind.RemoveFile:
      const deleteFile = state.filter((_file: any) => _file.name !== payload.name);

      return deleteFile;

    case ActionKind.ClearFile:
      return [];

    default:
      return state;
  }
}

export default function useMultiFileUpload() {
  const [files, dispatch] = useReducer(reducer, initialState);

  function handleNewFile({ file }: { file: any }) {
    dispatch({
      type: ActionKind.AddFile,
      payload: file
    });
  }

  function removeAllFile() {
    dispatch({
      type: ActionKind.ClearFile,
      payload: null
    });
  }

  function removeOneFile(file: File | string) {
    dispatch({
      type: ActionKind.RemoveFile,
      payload: file
    });
  }

  return {
    files,

    handleNewFile,
    removeOneFile,
    removeAllFile
  };
}
