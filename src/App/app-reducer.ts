export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as null | string,
  entityStatus: 'idle',
};

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType) => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      return {...state, status: action.status};
    }
    case 'APP/SET-ERROR': {
      return {...state, error: action.error};
    }
    default: {
      return state;
    }
  }
};

export const setStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);

export const setError = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const);

export type SetStatusType = ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>

export type AppActionsType = SetStatusType | SetErrorType