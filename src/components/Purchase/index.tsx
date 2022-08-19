import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AuctionListing, DirectListing, MarketplaceModule, NFTMetadata } from "@3rdweb/sdk";
import { useMarketplace } from '@thirdweb-dev/react';

import toast, { Toaster } from 'react-hot-toast';
import { IoMdWallet } from "react-icons/io";
import { HiTag } from "react-icons/hi";

import { APP_CONFIG } from "../../config";

interface PurchaseProps {
	isListed: boolean;
	selectedNFT?: NFTMetadata;
	marketplaceModule: MarketplaceModule | undefined;
	listings: (AuctionListing | DirectListing)[];
}

const style = {
	button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
	buttonIcon: `text-xl`,
	buttonText: `ml-2 text-lg font-semibold`,
}  

export default function Purchase({ isListed, selectedNFT, marketplaceModule, listings }: PurchaseProps) {
	const router = useRouter();

	// console.log({ pathname, query });

	// delete router.query.isListed;

	// router.replace({ pathname, query }, undefined, { shallow: true });

	const [selectedMarketNft, setSelectedMarketNft] = useState<(AuctionListing | DirectListing)>();
	const [enableButton, setEnableButton] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const marketplace = useMarketplace(APP_CONFIG.MARKETPLACE_CONTRACT_ADDRESS);

	useEffect(() => {
		if (!listings || !isListed) return;

		(async () => {
			setSelectedMarketNft(listings.find(marketNft => marketNft.asset.id === selectedNFT?.id));
		})();

	}, [selectedNFT, listings, isListed]);

	useEffect(() => {
		if (!selectedMarketNft || !selectedNFT) return;

		setEnableButton(true);
	}, [selectedMarketNft, selectedNFT]);

	function handleConfirmPurchase(toastHandler = toast) {
		toastHandler.success('Purchase successfull!', {
			style: {
				background: '#04111d',
				color: '#fff'
			},
		});
	}

	async function handleBuyItem(listingId = selectedMarketNft!.id, quantityDesired = 1) {
		console.log("Buying...");
		setIsLoading(true);

		try {
			await marketplace?.buyoutListing(listingId, quantityDesired);	

			const { pathname, query } = router;
			query.isListed = "false";

			router.replace({ pathname, query }, undefined, { shallow: true });

			handleConfirmPurchase();			
			setIsLoading(false);
		} catch (error: any) {
			console.log({ error });
			toast.error(`Something went wrong: ${error.message}`);
			setIsLoading(false);
		}
	}

	return (
		<div className="bg-[#303339] h-20 w-full flex items-center px-12 rounded-lg border-[#151c22] border">
			<Toaster position="top-center" reverseOrder={false} />

			{ isListed ? (
			<>
				<button 
					className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
					onClick={() => enableButton ? handleBuyItem(selectedMarketNft?.id, 1) : null} 
					disabled={isLoading}
				>
					<IoMdWallet className={style.buttonIcon} />					
					<div className={style.buttonText}>{ isLoading ? 'Purchasing...' : 'Buy Now'}</div>					
				</button>

				<div className={`${style.button} border boder-[#151c22] bg-[#363840] hover:bg-[#4c505c]`}>
					<HiTag className={style.buttonIcon} />
					<div className={style.buttonText}>Make Offer</div>					
				</div>
			</>
			) : (
				<div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
					<IoMdWallet className={style.buttonIcon} />
					<div className={style.buttonText}>List Item</div>
				</div>
			)}
		</div>
	);
}
