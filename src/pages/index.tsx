import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import toast, { Toaster } from 'react-hot-toast';

import { client } from 'lib/sanityClient';
import { Header, Hero } from 'components';

const style = {
	wrapper: ``,
	walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
	button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
	details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

const Home: NextPage = () => {
	const connectWithMetamask = useMetamask();
	const metamaskAddress = useAddress();

	const welcomeUser = (username: string, toastHandler = toast) => {
		toastHandler.success(`Welcome back${username !== 'Unnamed' ? ` ${username}` : ''}!`, {
			style: {
				background: '#04111d',
				color: '#fff',
			}
		});
	};

	useEffect(() => {
		if (!metamaskAddress) return;

		(async () => {
			const userDoc = {
				_type: 'users',
				_id: metamaskAddress,
				userName: 'Unnamed',
				walletAddress: metamaskAddress,
			};

			const result = await client.createIfNotExists(userDoc);
			welcomeUser(result.userName);
		})();
	}, [metamaskAddress]);

	return (
		<div className={style.wrapper}>
			<Toaster position="top-center" reverseOrder={false} />
			
			{ metamaskAddress ? (
			<>
				<Header />

				<Hero />
			</>
			) : (
				<div className={style.walletConnectWrapper}>
					{/* <button className={style.button} onClick={() => connectWallet('injected')}> */}
					<button className={style.button} onClick={() => connectWithMetamask()}>
						Connect Wallet
					</button>

					<div className={style.details}>
						You need Chrome to be
						<br /> able to run this app.
					</div>
				</div>
			)}
		</div>
	);
}

export default Home;
