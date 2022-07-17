import useModel, { AuthModelT } from '@/root-store';
import * as React from 'react';

const getStorageKey = ( paramName: string, institutionID: number) => {
  const id = `${institutionID}:${paramName}`;
  return id;
}

const saveStorageValue = <T,>(paramName: string, institutionID: number, value: T) => {
  const key = getStorageKey(paramName, institutionID || -1);
  sessionStorage.setItem(key, JSON.stringify(value));
}

const getSavedStorageValue = <T,>(paramName: string, institutionID: number): T | undefined => {
  const item = sessionStorage.getItem(getStorageKey(paramName, institutionID));
  if (!item) return undefined;
  if (item === 'undefined' || item === 'null') return undefined;
  return JSON.parse(item) as T;
}

const useSessionStoredState = <T,>(
  initialState: T | (() => T),
  paramName: string,  
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const { institutionID } = useModel<AuthModelT>('AuthModel');
  const [val, setVal] = React.useState<T>(
    getSavedStorageValue(paramName, institutionID || -1) || initialState
  );

  React.useEffect(() => {
    saveStorageValue(paramName, institutionID || -1, val);    
  }, [val, paramName, institutionID]);

  return [val, setVal];
}

export default useSessionStoredState;