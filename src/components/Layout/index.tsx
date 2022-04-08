import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Wrapper from './Wrapper';

interface LayoutProps {
  children: ReactNode;
  id?: string;
}


function Layout(props: LayoutProps){
  return (
    <Wrapper id={'wrapper_'+props.id}>
      <Header />
      <Main id={props.id}>{props.children}</Main>
      <Footer />
    </Wrapper>
  );
}

export default Layout;