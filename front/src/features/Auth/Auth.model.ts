import fetch, { BaseResponseT, clearFetchCache } from '@/api';
import { observable, action, makeObservable } from 'mobx';

export const SESSION_ID_NAME = 'institutionID';

export type AuthModelT = {
  authorized: boolean,
  institutionID?: number,
  auth: (data: { account: string }) => Promise<any>,
  logout: () => void,
};

type AuthResponse = BaseResponseT & {
  data: {
    institutionID: number,
  },
}

class AuthModel implements AuthModelT {
  @observable authorized: boolean = !!sessionStorage.getItem(SESSION_ID_NAME);
  @observable institutionID?: number = parseInt(
    sessionStorage.getItem(SESSION_ID_NAME) || '',
    10
  ) || undefined;

  constructor() {
    makeObservable(this);
  }

  @action('Auth')
  auth = async (data: { account: string }) => {
    const getAccID = await fetch<AuthResponse>('/auth', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (getAccID.statusCode !== 200) return false;
    this.institutionID = getAccID.data.institutionID;
    sessionStorage.setItem(SESSION_ID_NAME, `${getAccID.data.institutionID}`);
    return await this.generateMockData();
  }

  logout = () => {
    sessionStorage.removeItem(SESSION_ID_NAME);
    clearFetchCache();
    this.authorized = false;
    this.institutionID = undefined;
  }

  @action('Generate mock data for account')
  private generateMockData = async() => {
    if (!this.institutionID) return;

    const generateMockData = await fetch<BaseResponseT>('/generate', {
      method: 'POST',
      body: JSON.stringify({ institutionID: this.institutionID })
    });

    if (generateMockData.statusCode !== 500) {
      this.authorized = true;
      return true;
    }

    return false;
  }
}

const AuthModelInstance = new AuthModel();
export default AuthModelInstance;