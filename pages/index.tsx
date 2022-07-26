import type { NextPage } from 'next';

import { Header, Hero } from '../src/components';

const Home: NextPage = () => {
	return (
		<>
			<Header />

			<Hero />
		</>
	);
}

export default Home;
