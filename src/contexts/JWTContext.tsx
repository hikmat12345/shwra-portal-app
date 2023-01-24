import { createContext, ReactNode, useEffect, useReducer , useCallback } from 'react';
// utils
import { authService, accountService } from '../services';
import { isValidToken, setSession, getUserSession } from '../utils/jwt';
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType, AppRole, IAppRole } from '../@types/authentication';
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

enum Types {
  auth = 'AUTHENTICATE',
  logout = 'LOGOUT'
}

type JWTAuthPayload = {
  [Types.auth]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.logout]: undefined;
};


export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);


function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  // 
  const getSession = useCallback(
    async () => {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const userRefreshToken = window.localStorage.getItem('_rt');

      if (accessToken&&userRefreshToken) {
        
        if(isValidToken(accessToken)){

          setSession(accessToken, userRefreshToken);

          const user = await  authService.currentUser();
  
          dispatch({
            type: Types.auth,
            payload: {
              isAuthenticated: true,
              user
            }
          });

        } else {

          try{
           
            const  getUser = getUserSession(accessToken)

            const newSession = await authService.refreshToken({
              userId: getUser.uid,
              refreshToken: userRefreshToken
            })

            const { token, refreshToken } = newSession;

            if(token&&refreshToken) {
              setSession(token, refreshToken);

              dispatch({
                type: Types.auth,
                payload: {
                  isAuthenticated: true,
                  user: newSession
                }
              });
            } else {
              dispatch({
                type: Types.auth,
                payload: {
                  isAuthenticated: false,
                  user: null
                }
              });
            }

          } catch(e) {

            console.error(e)

            dispatch({
              type: Types.auth,
              payload: {
                isAuthenticated: false,
                user: null
              }
            });
    
          }

        }
       
      } else {

        dispatch({
          type: Types.auth,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });

      }

    } catch (err) {
      console.error(err);
      dispatch({
        type: Types.auth,
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  
  },[]);


  const initial = useCallback(async () => {
    try {
      await getSession();
    } catch {
      dispatch({
        type: Types.auth,
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  }, [getSession]);


  useEffect(() => {
    initial();
  }, [initial]);



  const login = async (email: string, password: string) => {
    try {

      const user = await authService.login({
        email,
        password
      })
      
      const { token, refreshToken } = user;


      setSession(token, refreshToken);

      dispatch({
        type: Types.auth,
        payload: {
          isAuthenticated: true,
          user
        }
      });

    } catch(error){
      throw error
    }

  };

  const register = async (email: string, password: string, phoneNumber:string, firstName: string, lastName: string) => {
   try{

      await authService.register({
        email,
        password,
        phoneNumber,
        firstName,
        lastName
      })

      window.location.href = PATH_AUTH.login;

    } catch(error){
      throw error
    }
  };

  const logout = async () => {
    //const response = await axios.post('/Account/Logout');

    setSession(null, null);

    dispatch({ type: Types.logout });

  };

  const completeProfile = async (data: any) => {
    try {
      
      await accountService.completeProfile(
        data
      )
  
      await getSession();

    } catch(error){
      throw error
    }
  };



  const forgetPassword = async (email: string) => {
    try {

       return await authService.forgetPassword({ email });

    } catch(error){
      throw error
    }
  };



  const resetPassword = async (token:string ,password: string, confirmPassword: string, email:string) => {
    try {

       return await authService.passwordRest({ 
          token: token,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
       });

    } catch(error){
      throw error
    }
  };




  const updateProfile = () => { };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        user: {
          role: AppRole.Lawyer,
          displayName: state?.user?.userName || 'مستخدم شورى',
          ...state.user
        },
        method: 'jwt',
        login,
        logout,
        register,
        forgetPassword,
        resetPassword,
        updateProfile,
        completeProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
