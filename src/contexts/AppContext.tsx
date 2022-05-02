import {
  createContext,
  ReactNode,
  useCallback,
} from 'react';

import { Interweave } from 'interweave';

import contentsJson from '../contents/contents.json';


type ContentsProperty = 'id' | 'url' | 'title' | 'short' | 'description';

interface IAppContext {
  getHtmlFromContents: (id: string, property: ContentsProperty, tag?: string) => JSX.Element;
  getItemFromContents: (id: string, property: ContentsProperty) => string;
  navigationOpen: () => void;
  navigationClose: () => void;
}

interface IAppContextProviderProps {
  children: ReactNode;
}


export const AppContext = createContext<IAppContext>({} as IAppContext);


export function AppContextProvider(props: IAppContextProviderProps) {

  const getHtmlFromContents = useCallback((id: string, property: ContentsProperty, tag?: string): JSX.Element => {
    const filteredItem = contentsJson.filter(item => item.id === id)[0];   
    return <Interweave noWrap content={filteredItem[property]} />;
  }, []);

  const getItemFromContents = useCallback((id: string, property: ContentsProperty): string => {
    const filteredItem = contentsJson.filter(item => item.id === id)[0];   
    return filteredItem[property];
  }, []);

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
      getHtmlFromContents,
      getItemFromContents,
      navigationOpen,
      navigationClose,
    }}>
      {props.children}
    </AppContext.Provider>
  );
}