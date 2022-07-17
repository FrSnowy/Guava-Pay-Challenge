import * as React from 'react';
import Accordion from '@/components/Accordion';
import useSessionStoredState from './useSessionStoredState';
import ResetIcon from '@/components/ResetIcon';
import { Divider, Input } from 'semantic-ui-react';

type AmountFilterT = {
  paramName: string,
}

const useAmountFilter = ({ paramName }: AmountFilterT) => {
  const [min, setMin] = useSessionStoredState<string | undefined>(undefined, `${paramName}_min`);
  const [max, setMax] = useSessionStoredState<string | undefined>(undefined, `${paramName}_max`);

  const [realMin, setRealMin] = React.useState<string | undefined>(undefined);
  const [realMax, setRealMax] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (!min && !max) {
      setRealMin(undefined);
      setRealMax(undefined);
      return;
    }

    if (min && !max) {
      setRealMin(min);
      setRealMax(undefined);
      return;
    }

    if (max && !min) {
      setRealMin(undefined);
      setRealMax(max);
      return;
    }

    if (min && max) {
      const parsedMin = parseFloat(min);
      const parsedMax = parseFloat(max);
      if (parsedMin > parsedMax) {
        setRealMin(min);
        setRealMax(undefined);
        return;
      }

      setRealMin(min);
      setRealMax(max);
      return;
    }
  }, [min, max]);

  const name = React.useMemo(() => {
    const base = 'By amount';
    let additional = '';
    if (!realMin && !realMax) return base;
  
    if (realMin && !realMax) additional = `more than ${parseFloat(realMin)}`;
    if (realMax && !realMin) additional = `less than ${parseFloat(realMax)}`;
    if (realMin && realMax) {
      if (realMin === realMax) additional = `equals ${parseFloat(realMin)}`;
      else additional = `from ${parseFloat(realMin)} to ${parseFloat(realMax)}`;
    }
    return `${base}: ${additional}`;
  }, [realMin, realMax]);

  const inputKeyDownHandler: React.KeyboardEventHandler = e => {
    const canceledSymbols = ['-', ',', '.'];
    const input = (e.target) as HTMLInputElement;
    const isCanceledZero = (input.value.length === 0 && e.key === '0');
    const isCanceledSymbol = canceledSymbols.some(k => e.key === k)
    if (isCanceledSymbol || isCanceledZero) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  }

  const inputChangeHandler = React.useCallback((t: 'min' | 'max', v: string) => {
    const realV = v === '' ? undefined : v;
    if (t === 'min') setMin(realV);
    if (t === 'max') setMax(realV);
  }, []);

  const resetIcon = React.useMemo(() => {
    if (realMin === undefined && realMax === undefined) return null;
    return (
      <ResetIcon
        onClick={() => {
          setMin(undefined);
          setMax(undefined);
          setRealMin(undefined);
          setRealMax(undefined);
        }}
      />
    )
  } , [realMin, realMax]);

  const view = React.useMemo(() => {
    return (
      <Accordion name={name} resetIcon={resetIcon}>
        <Input
          fluid
          type='number'
          value={min || ''}
          label='Min. amount'
          pattern="[0-9]+"
          onChange={e => inputChangeHandler('min', e.target.value)}
          onKeyDown={inputKeyDownHandler}
        />
        <Divider />
        <Input
          fluid
          type='number'
          value={max || ''}
          label='Max. amount'
          pattern="[0-9]+"
          onChange={e => inputChangeHandler('max', e.target.value)}
          onKeyDown={inputKeyDownHandler}
        />
      </Accordion>
    )
  }, [name, inputChangeHandler, min, max]);

  return { view, min: realMin, max: realMax };
}

export default useAmountFilter;