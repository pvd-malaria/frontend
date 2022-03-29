import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Wrapper from './Wrapper';

interface LayoutProps {
  children: ReactNode;
}


function Layout(props: LayoutProps){
  return (
    <Wrapper>
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </Wrapper>
  );
}

export default Layout;