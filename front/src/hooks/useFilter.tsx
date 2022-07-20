import Accordion from '@/components/Accordion';
import ResetIcon from '@/components/ResetIcon';
import * as React from 'react';
import { Radio } from 'semantic-ui-react';
import useSessionStoredState from './useSessionStoredState';

type FilterValues = {
  name: string;
  paramName: string;
  values: Array<{ label: string; value: string }>;
};

const useFilter = <T extends FilterValues>({ name, paramName, values }: T) => {
  const [current, setCurrent] = useSessionStoredState<string | undefined>(
    undefined,
    paramName
  );

  const label = React.useMemo(
    () => values.find((v) => v.value === current)?.label,
    [values]
  );

  const onRadioClick = React.useCallback(
    (v: string) => {
      if (current === v) {
        setCurrent(undefined);
        return;
      }

      setCurrent(v);
    },
    [current]
  );

  const filterVariantsView = React.useMemo(() => {
    return values.map(({ label, value }) => (
      <Radio
        key={value}
        label={label}
        checked={value === current}
        onClick={() => onRadioClick(value)}
      />
    ));
  }, [values, current]);

  const view = React.useMemo(() => {
    if (filterVariantsView.length < 2) return null;

    return (
      <Accordion
        name={label ? `${name}: ${label}` : name}
        resetIcon={
          current ? <ResetIcon onClick={() => setCurrent(undefined)} /> : null
        }
      >
        {filterVariantsView}
      </Accordion>
    );
  }, [name, filterVariantsView]);

  return { view, value: view ? current : undefined };
};

export default useFilter;
