import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { useWeb3 } from "@3rdweb/hooks";
import { AuctionListing, DirectListing, NFTMetadata, ThirdwebSDK } from "@3rdweb/sdk";

import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi"

import { client } from "../../src/lib/sanityClient";
import { Header } from "../../src/components";
import { CgWebsite } from "react-icons/cg";
import NFTCard from "../../src/components/NFTCard";

const styles = {
	bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
	bannerImage: `w-full object-cover`,
	infoContainer: `w-screen px-4`,
	midRow: `w-full flex justify-center text-white`,
	endRow: `w-full flex justify-end text-white`,
	profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
	socialIconsContainer: `flex text-3xl mb-[-2rem]`,
	socialIconsWrapper: `w-44`,
	socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
	socialIcon: `my-2`,
	divider: `border-r-2`,
	title: `text-5xl font-bold mb-4`,
	createdBy: `text-lg mb-4`,
	statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
	collectionStat: `w-1/4`,
	statValue: `text-3xl font-bold w-full flex items-center justify-center`,
	ethLogo: `h-6 mr-2`,
	statName: `text-lg w-full text-center mt-1`,
	description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

interface CollectionProps {
	allOwners: any[];
	bannerImageUrl: string;
	contractAddress: string;
	createdBy: {
		_ref: string;
		_type: string;
	};
	creator: string;
	description: string;
	floorPrice: number;
	imageUrl: string;
	title: string;
	volumeTraded: number;
}

export default function Collection() {
	const { query: { collectionId }} = useRouter();
	const { provider } = useWeb3();
	
	const [collection, setCollection] = useState<CollectionProps>({} as CollectionProps);
	const [nfts, setNfts] = useState<NFTMetadata[]>([]);
	const [listings, setListings] = useState<(AuctionListing | DirectListing)[]>([]);

	//https://eth-rinkeby.alchemyapi.io/v2/HCAFadnuYUpLeKE_JODyTWlfkXzwlc98

	const nftModule = useMemo(() => {
		if (!provider) {
			return;
		}

		const sdk = new ThirdwebSDK(
			provider?.getSigner(),
			{ readOnlyRpcUrl: 'https://eth-rinkeby.alchemyapi.io/v2/HCAFadnuYUpLeKE_JODyTWlfkXzwlc98' }
		);

		return sdk.getNFTModule(collectionId as string);
	}, [provider]);

	useEffect(() => {
		if (!nftModule) return;

		(async () => {
			const nfts = await nftModule.getAll();
			setNfts(nfts);
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

		(async () => {
			setListings(await marketplaceModule.getAllListings());
		})();
	}, [marketplaceModule]);
	
	const fetchCollectionData = async (sanityClient = client) => {
		const query = `
		*[_type=="marketItems" && contractAddress == "${collectionId}"] {
			"imageUrl": profileImage.asset->url,
			"bannerImageUrl": bannerImage.asset->url,
			volumeTraded,
			createdBy,
			contractAddress,
			"creator": createdBy->userName,
			title,
			floorPrice,
			"allOwners": owners[]->,
			description
		}	
		`;

		const collectionData = await sanityClient.fetch(query);
		setCollection(collectionData[0]);
	}

	useEffect(() => {
		fetchCollectionData(client);
	}, [collectionId]);

	return (
		<>
		{ collection && (
			<div className="overflow-hidden">
				<Header />
	
				<div className={styles.bannerImageContainer}>
					<img src={collection?.bannerImageUrl || 'https://via.placeholder.com/200' } alt="banner" className={styles.bannerImage} />
				</div>	
	
				<div className={styles.infoContainer}>
					<div className={styles.midRow}>
						<img className={styles.profileImg} alt="profile image" src={collection?.imageUrl || 'https://via.placeholder.com/200'} />
					</div>
	
					<div className={styles.endRow}>
						<div className={styles.socialIconsContainer}>
							<div className={styles.socialIconsWrapper}>
								<div className={styles.socialIconsContent}>
									<div className={styles.socialIcon}>
										<CgWebsite />
									</div>
	
									<div className={styles.divider} />
	
									<div className={styles.socialIcon}>
										<AiOutlineInstagram />
									</div>
	
									<div className={styles.divider} />
	
									<div className={styles.socialIcon}>
										<AiOutlineTwitter />
									</div>
	
									<div className={styles.divider} />
	
									<div className={styles.socialIcon}>
										<HiDotsVertical />
									</div>
								</div>
							</div>
						</div>
					</div>
	
					<div className={styles.midRow}>
						<div className={styles.title}>{ collection?.title }</div>
					</div>
	
					<div className={styles.midRow}>
						<div className={styles.createdBy}>
							Created by{' '}
							<span className="text-[#2081e2]">{ collection?.creator }</span>
						</div>
					</div>
	
					<div className={styles.midRow}>
						<div className={styles.statsContainer}>
							<div className={styles.collectionStat}>
								<div className={styles.statValue}>{nfts.length}</div>
								<div className={styles.statName}>items</div>
							</div>
	
							<div className={styles.collectionStat}>
								<div className={styles.statValue}>{collection?.allOwners?.length || ''}</div>
								<div className={styles.statName}>owners</div>
							</div>
	
							<div className={styles.collectionStat}>
								<div className={styles.statValue}>
									<img src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" className={styles.ethLogo} alt="eth" />
									{ collection?.floorPrice }
								</div>
	
								<div className={styles.statName}>floor price</div>
							</div>
	
							<div className={styles.collectionStat}>
								<div className={styles.statValue}>
									<img src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" className={styles.ethLogo} alt="eth" />
									{ collection?.volumeTraded }.5k
								</div>
	
								<div className={styles.statName}>volume traded</div>
							</div>
						</div>
					</div>
	
					<div className={styles.midRow}>
						<div className={styles.description}>{ collection?.description }</div>
					</div>
				</div>	
	
				<div className="flex flex-wrap">
					{ nfts.map((nftItem, id) => (
						<NFTCard 
							key={id}
							nftItem={nftItem}
							title={collection?.title}
							listings={listings}
						/>
					))}	
				</div>	
			</div>
		)}
		</>
	);
}
