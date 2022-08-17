import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useWeb3 } from "@3rdweb/hooks";

import { AuctionListing, DirectListing, NFTMetadata, ThirdwebSDK } from "@3rdweb/sdk";

import { Header } from "../../src/components";

import NFTImage from "../../src/components/NFT/NFTImage";
import GeneralDetails from "../../src/components/NFT/GeneralDetails";
import ItemActivity from "../../src/components/NFT/ItemActivity";

const styles = {
	wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
	container: `container p-6`,
	topContent: `flex`,
	nftImgContainer: `flex-1 mr-4`,
	detailsContainer: `flex-[2] ml-4`, 
}

export default function NFTItem() {
	const router = useRouter();
	const { provider } = useWeb3();

	const [selectedNFt, setSelectedNft] = useState<NFTMetadata>();
	const [listings, setListings] = useState<(AuctionListing | DirectListing)[]>([]);

	const { nftItemId } = router.query; 

	const nftModule = useMemo(() => {
		if (!provider)  return;

		const sdk = new ThirdwebSDK(
			provider?.getSigner(),
			{ readOnlyRpcUrl: 'https://eth-rinkeby.alchemyapi.io/v2/HCAFadnuYUpLeKE_JODyTWlfkXzwlc98' }
		);
 
		return sdk.getNFTModule('0x57b0739323c81fE44f5AA4E537b96a508ed43EBF');
	}, [provider]);

	useEffect(() => {
		if (!nftModule) return;

		(async () => {
			const nftItem = await nftModule.get(nftItemId as string);
			setSelectedNft(nftItem);
		})();
	}, [nftModule]);

	const marketplaceModule = useMemo(() => {
		if (!provider) return;

		const sdk = new ThirdwebSDK(
			provider?.getSigner(),
			{ readOnlyRpcUrl: 'https://eth-rinkeby.alchemyapi.io/v2/HCAFadnuYUpLeKE_JODyTWlfkXzwlc98' }
		);

		return sdk.getMarketplaceModule('0x715AFFeEFdfEa81Dc3E4959F1d304225Bc1e7f34');
	}, [provider]);

	useEffect(() => {
		if (!marketplaceModule) return;

		(async() => {
			setListings(await marketplaceModule.getAllListings());
		})();
	}, [marketplaceModule]);

	return (
		<div>
			<Header />
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<div className={styles.topContent}>
						<div className={styles.nftImgContainer}>
							<NFTImage selectedNFT={selectedNFt} />
						</div>	

						<div className={styles.detailsContainer}>
							<GeneralDetails selectedNFT={selectedNFt} />
						</div>					
					</div>

					<ItemActivity />
				</div>
			</div>
		</div>
	);
}
