import * as React from 'react';
import clsx from 'clsx';
import styles from './style.module.pcss';
import { Breadcrumb, Container as SemanticContainer, Header } from 'semantic-ui-react'
import { Link, matchPath, useLocation } from 'react-router-dom';
import { AppRoutesConfig } from '@/App';

type BreadcrumbsT = {
  transactionName?: string,
  cardName?: string,
}

const routeNames: Record<(typeof AppRoutesConfig[number])['path'], (p: BreadcrumbsT) => string> = {
  '/auth': () => 'Authorization',
  '/transactions': () => 'Institution transactions',
  '/transactions/:id': ({ transactionName }) => transactionName || 'Unknown transaction',
  '/cards': () => 'Institution cards',
  '/cards/:id': ({ cardName }) => cardName || 'Unknown card',
}

export const Breadcrumbs: React.FC<BreadcrumbsT> = props => {
  const { pathname } = useLocation();

  const pathnameAsArray = pathname.split('/').map(t => `/${t}`);

  const breadcrumbs = pathnameAsArray.map((_, i) => {
    const slicedPathname = pathnameAsArray.slice(0, pathnameAsArray.length - i).join('').replace(/\/+/g, '/');
    if (slicedPathname === '/') return null;

    const matchedRoute = AppRoutesConfig.find(r => matchPath(r.path || '', slicedPathname));
    const name = matchedRoute ? routeNames[matchedRoute.path](props) : undefined;

    return { name, path: slicedPathname, current: slicedPathname === pathname };
  }).filter(v => !!v).reverse();

  return (
    <div className={styles.menu}>
        {breadcrumbs.map(b => b ? (
          <React.Fragment key={b.path}>
            {
              b.current
                ? <span className={clsx(styles.link, styles.active)}>{b.name}</span>
                : <Link to={b.path} className={clsx(styles.link, { [styles.active]: !!b?.current })}>{b.name}</Link>
            }
            <Breadcrumb.Divider content='>' />
          </React.Fragment>
        ) : null)}
    </div>
  );
}


export const Title: React.FC<{ title?: string }> = ({ title }) => React.useMemo(() => (
  <div>
    <Header as="h1" textAlign='center'>
      <Header.Content>{title || 'GuavaPay Challenge'}</Header.Content>
    </Header>
  </div>
), [title]);

export const MainPageNavigation: React.FC<{ onPageChange?: () => void }> = ({ onPageChange }) => {
  const location = useLocation();

  const onPageChangeHandler = React.useCallback(() => {
    onPageChange && onPageChange();
  }, [onPageChange]);

  return React.useMemo(() => (
    <div className={styles.menu}>
      <SemanticContainer textAlign='center'>
        <Link
          onClick={onPageChangeHandler}
          to = '/transactions'
          className={clsx(
            styles.link,{
              [styles.active]: matchPath('/transactions', location.pathname)
            }
          )}
        >
          Institution transactions
        </Link>
        <Link
          onClick={onPageChangeHandler}
          to ='/cards'
          className={clsx(
            styles.link, {
              [styles.active]: matchPath('/cards', location.pathname)
            }
          )}
        >
          Institution cards
        </Link>
      </SemanticContainer>
    </div>
  ), [location]);
};

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.header}>
    {children}
  </div>
);

