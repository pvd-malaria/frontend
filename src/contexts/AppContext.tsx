import {
  createContext,
  ReactNode,
  useCallback,
} from 'react';


interface IAppContext {
  navigationOpen: () => void;
  navigationClose: () => void;
}

interface IAppContextProviderProps {
  children: ReactNode;
}


export const AppContext = createContext<IAppContext>({} as IAppContext);


export function AppContextProvider(props: IAppContextProviderProps) {
  const navigationOpen = useCallback(() => {
    document.querySelector('body')?.classList.add('navigation-open');
    document.querySelector('body')?.classList.add('no-scroll');
  }, []);

  const navigationClose = useCallback(() => {
    document.querySelector('body')?.classList.remove('navigation-open');
    document.querySelector('body')?.classList.remove('no-scroll');
  }, []);


  return (
    <AppContext.Provider value={{
      navigationOpen,
      navigationClose,
    }}>
      {props.children}
    </AppContext.Provider>
  );
}