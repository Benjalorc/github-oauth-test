import React from 'react';
import Header from './Header';
import type { FC, ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<LayoutProps> = ({ children }) => {
	
	return(
		<>
			<Header />
			{ children }
		</>
	)
}

export default MainLayout;