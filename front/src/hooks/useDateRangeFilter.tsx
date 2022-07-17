import * as React from 'react';
import Accordion from '@/components/Accordion';
import Calendar from 'react-calendar'
import useSessionStoredState from './useSessionStoredState';
import ResetIcon from '@/components/ResetIcon';

const dateWithoutOffset = (date: Date) =>
  new Date(date.getTime() - new Date().getTimezoneOffset() * 60000);

type DateRangeFilterT = {
  paramName: string,
}

const useDateRangeFilter = ({ paramName }: DateRangeFilterT) => {
  const [current, setCurrent] = useSessionStoredState<[string, string] | undefined>(undefined, paramName);

  const onCalendarChangeHandler = React.useCallback((v: any) => {
    const datesRange = Array.isArray(v) ? v as [Date, Date] : undefined;
    if (!datesRange) {
      setCurrent(undefined);
      return;
    }

    const isoDates = datesRange.map(d => dateWithoutOffset(d).toISOString().replace(':000Z', '')) as [string, string];
    setCurrent(isoDates);
  }, []);

  const renderValues = React.useMemo<[Date, Date] | null>(() =>
    current
      ? [
        new Date(Date.parse(current[0]) + new Date().getTimezoneOffset() * 60000),
        new Date(Date.parse(current[1]) + new Date().getTimezoneOffset() * 60000),
      ] : null,
    [current]
  );

  const name = React.useMemo(() => {
    const base = 'By date';
    if (!renderValues) return base;

    const datesAsString = renderValues.map(d => d.toLocaleDateString());
    if (datesAsString[0] === datesAsString[1]) {
      return `${base}: ${datesAsString[0]}`;
    }

    return `${base}: ${datesAsString.join(' - ')}`;
  }, [renderValues])

  const view = React.useMemo(() => {
    return (
      <Accordion
        name={name}
        resetIcon={current ? <ResetIcon onClick={() => setCurrent(undefined)}/> : null}
      >
        <Calendar
          selectRange
          locale='en'
          value={renderValues}
          onChange={onCalendarChangeHandler}
          
        />
      </Accordion>
    )
  }, [current]);

  return { view, value: current };
}

export default useDateRangeFilter;