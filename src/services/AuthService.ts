import * as Sentry from '@sentry/react';
import { createFileUrl } from 'components/file/FilePreview';
import { setProfile } from 'redux/slices/user';
import { dispatch } from 'redux/store';

type IRole = 'Admin' | 'Lawyer' | 'Client';

type IStatus = 'Approved' | 'Blocked' | 'Pending';

export interface IAuthUser {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  token: string;
  role: IRole;
  refreshToken: string;
  refreshTokenExpiryOn: string;
  isCompleted: boolean;
  status: IStatus;
  about?: string;
  address?: string;
  birthDate?: string;
  country?: string;
  city?: string;
  state?: string;
  gender: 0 | 1;
  profileImageUrl?: string;
  zipCode?: string;
}

export interface IAuthService {
  register({
    email,
    password,
    firstName,
    lastName
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<void>;

  login({ email, password }: { email: string; password: string }): Promise<IAuthUser>;

  currentUser(): Promise<IAuthUser>;

  refreshToken({
    userId,
    refreshToken
  }: {
    userId: string;
    refreshToken: string;
  }): Promise<IAuthUser>;

  forgetPassword({ email }: { email: string }): Promise<string>;

  passwordRest({
    token,
    password,
    confirmPassword,
    email
  }: {
    token: string;
    password: string;
    confirmPassword: string;
    email: string;
  }): Promise<string>;
}

export default class AuthService implements IAuthService {
  private http: any;

  constructor(http: any) {
    this.http = http;
  }

  /**
   * @name
   */
  public async login({ email, password }: { email: string; password: string }): Promise<IAuthUser> {
    try {
      const response = await this.http.post('/Account/login', {
        email,
        password
      });

      const image: any = response?.data?.profileImageUrl
        ? await createFileUrl({
            fileName: response?.data?.profileImageUrl,
            type: 'image'
          })
        : '';
      const userAtrr = await this.getUserArr({
        ...response.data,
        profileImageUrl: response?.data?.profileImageUrl ? image : '',
        displayName: `${response.data?.firstName || ''} ${response.data?.lasttName || ''}`
      });
      if (image) {
        image.onload = () => {
          const profileImage = image.result;
          dispatch(
            setProfile({
              ...response.data,
              profileImageUrl: response?.data?.profileImageUrl ? profileImage : '',
              displayName: `${response.data?.firstName || ''} ${response.data?.lasttName || ''}`
            })
          );
        };
      } else {
        dispatch(
          setProfile({
            ...response.data,
            profileImageUrl: '',
            displayName: `${response.data?.firstName || ''} ${response.data?.lasttName || ''}`
          })
        );
      }
      return userAtrr;
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }

  /**
   * @name
   */
  public async register({
    email,
    password,
    phoneNumber,
    firstName,
    lastName
  }: {
    email: string;
    password: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
  }): Promise<void> {
    try {
      await this.http.post('/Account/register', {
        lastName,
        firstName,
        userName: email,
        email,
        password: password,
        confirmPassword: password,
        phoneNumber: phoneNumber.toString(),
        countryCode: '+966'
      });
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }

  /**
   * @name
   */
  public async currentUser(): Promise<IAuthUser> {
    function getFileExtension(filename: string) {
      return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
    }
    try {
      const response = await this.http.get('/Account/CurrentUser');

      const image: any = await createFileUrl({
        fileName: response?.data?.profileImageUrl,
        type: 'image'
      });

      const userAtrr = await this.getUserArr({
        ...response.data,
        profileImageUrl: response?.data?.profileImageUrl ? image : '',
        displayName: `${response.data?.firstName || ''} ${response.data?.lasttName || ''}`
      });
      if (image) {
        image.onload = () => {
          const profileImage = image.result;
          dispatch(
            setProfile({
              ...response.data,
              profileImageUrl: response?.data?.profileImageUrl ? profileImage : '',
              displayName: `${response.data?.firstName || ''} ${response.data?.lasttName || ''}`
            })
          );
        };
      } else {
        dispatch(
          setProfile({
            ...response.data,
            profileImageUrl: '',
            displayName: `${response.data?.firstName || ''} ${response.data?.lasttName || ''}`
          })
        );
      }

      return userAtrr;
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }

  /**
   * @name
   */
  public async refreshToken({
    userId,
    refreshToken
  }: {
    userId: string;
    refreshToken: string;
  }): Promise<IAuthUser> {
    try {
      const response: any = await this.http.post('/Account/RefreshToken', {
        userId,
        refreshToken
      });

      const image: any = response?.data?.profileImageUrl
        ? await createFileUrl({
            fileName: response?.data?.profileImageUrl,
            type: 'image'
          })
        : '';
      const userAtrr = await this.getUserArr({
        ...response.data,
        profileImageUrl: response?.data?.profileImageUrl ? image : '',
        displayName: `${response.data?.firstName || ''} ${response.data?.lasttName || ''}`
      });
      if (image) {
        image.onload = () => {
          const profileImage = image.result;
          dispatch(
            setProfile({
              ...response.data,
              profileImageUrl: response?.data?.profileImageUrl ? profileImage : '',
              displayName: `${response.data?.firstName || ''} ${response.data?.lasttName || ''}`
            })
          );
        };
      } else {
        dispatch(
          setProfile({
            ...response.data,
            profileImageUrl: '',
            displayName: `${response.data?.firstName || ''} ${response.data?.lasttName || ''}`
          })
        );
      }
      return userAtrr;
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }

  /**
   * @name
   */
  public async forgetPassword({ email }: { email: string }): Promise<string> {
    try {
      const response: any = await this.http.get('/Account/forgetPassword', {
        params: { email }
      });

      return response;
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }

  /**
   * @name
   */
  public async passwordRest({
    token,
    email,
    password,
    confirmPassword
  }: {
    token: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<string> {
    try {
      const isMatch = password === confirmPassword;

      if (!isMatch) {
        throw new Error('Password and Confirm Password does not match');
      }

      let formData = new FormData();
      formData.append("Token", token);
      formData.append("Email", email);
      formData.append("NewPassword", password);
      formData.append("ConfirmPassword", confirmPassword);
      const response: any = await this.http.post('/Account/resetPassword',formData);

      return response;
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }

  //--------------------------------------------------------------------------
  private async getUserArr(data: IAuthUser): Promise<IAuthUser> {
    try {
      return {
        ...data
      };
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
