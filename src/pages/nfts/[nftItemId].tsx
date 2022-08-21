import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useWeb3 } from "@3rdweb/hooks";

import { AuctionListing, DirectListing, NFTMetadata, ThirdwebSDK } from "@3rdweb/sdk";

import { APP_CONFIG } from "../../config";

import { Header, Purchase } from "../../components";

import NFTImage from "../../components/NFT/NFTImage";
import GeneralDetails from "../../components/NFT/GeneralDetails";
import ItemActivity from "../../components/NFT/ItemActivity";

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

	const [selectedNFT, setSelectedNft] = useState<NFTMetadata>();
	const [listings, setListings] = useState<(AuctionListing | DirectListing)[]>([]);

	const { nftItemId, isListed } = router.query; 

	const nftModule = useMemo(() => {
		if (!provider)  return;

		const sdk = new ThirdwebSDK(provider?.getSigner());
 
		return sdk.getNFTModule(APP_CONFIG.COLLECTION_ADDRESS);
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

		const sdk = new ThirdwebSDK(provider?.getSigner());

		return sdk.getMarketplaceModule(APP_CONFIG.MARKETPLACE_CONTRACT_ADDRESS);
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
							<NFTImage selectedNFT={selectedNFT} />
						</div>	

						<div className={styles.detailsContainer}>
							<GeneralDetails selectedNFT={selectedNFT} />

							<Purchase 
								isListed={isListed === "true"} 
								selectedNFT={selectedNFT} 
								marketplaceModule={marketplaceModule} 
								listings={listings}
							/>
						</div>					
					</div>

					<ItemActivity />
				</div>
			</div>
		</div>
	);
}
