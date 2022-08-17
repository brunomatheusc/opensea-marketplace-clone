import { NFTMetadata } from "@3rdweb/sdk";
import { AiOutlineHeart } from "react-icons/ai";
import { IoMdSnow } from 'react-icons/io';

import { styles } from './styles';

interface NFTImageProps {
	selectedNFT?: NFTMetadata;
}

export default function NFTImage ({ selectedNFT }: NFTImageProps) {
	return (
		<div>
			<div className={styles.topBar}>
				<div className={styles.topBarContent}>
					<IoMdSnow />
					
					<div className={styles.likesCounter}>
						<AiOutlineHeart />
						2.3k
					</div>
				</div>
			</div>

			<div>
				<img src={selectedNFT?.image} alt="NFT Item image" />
			</div>
		</div>
	);
}