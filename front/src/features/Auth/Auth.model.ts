import fetch, { BaseResponseT } from '@/api';
import { observable, action, makeObservable } from 'mobx';

export type AuthModelT = {
  authorized: boolean,
  institutionID?: number,
  auth: (data: { account: string }) => Promise<any>,
};

type AuthResponse = BaseResponseT & {
  data: {
    institutionID: number,
  },
}

class AuthModel implements AuthModelT {
  @observable authorized: boolean = false;
  @observable institutionID?: number;

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
    return await this.generateMockData();
  }

  @action('Generate mock data for account')
  private generateMockData = async() => {
    if (this.institutionID === null || this.institutionID === undefined) return;

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