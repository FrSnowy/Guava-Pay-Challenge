import fetch, { BaseResponseT } from '@/api';
import { observable, action, makeObservable } from 'mobx';

export type AuthModelT = {
  authorized: boolean,
  accountID?: number,
  auth: (data: { account: string }) => Promise<any>,
};

type AuthResponse = BaseResponseT & {
  data: {
    accountID: number,
  },
}

class AuthModel implements AuthModelT {
  @observable authorized: boolean = false;
  @observable accountID?: number;

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
    this.accountID = getAccID.data.accountID;
    return await this.generateMockData(data.account);
  }

  @action('Generate mock data for account')
  private generateMockData = async(account: string) => {
    if (this.accountID === null || this.accountID === undefined) return;

    const [_, paramsStr] = account.split(':');
    const params = paramsStr ? paramsStr.split(',') : [];

    const findParam = (param: string, defVal: number) => {
      let count = parseInt(
        params.find(p => p.includes(`${param}=`))?.split('=')[1] || `${defVal}`,
        10
      );

      return Number.isNaN(count) ? defVal : count;
    }

    const cardsCount = findParam('c', 5);
    const transactionsCount = findParam('t', 25);

    const generateMockData = await fetch<BaseResponseT>('/generate', {
      method: 'POST',
      body: JSON.stringify({ accountID: this.accountID, cardsCount, transactionsCount })
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