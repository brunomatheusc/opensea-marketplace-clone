import { NFTMetadata } from "@3rdweb/sdk";

import { AiFillHeart } from 'react-icons/ai';
import { MdRefresh } from 'react-icons/md';
import { RiShareBoxLine } from 'react-icons/ri';
import { FiMoreVertical } from 'react-icons/fi';
import { GiShare } from 'react-icons/gi';

interface GeneralDetailsProps {
	selectedNFT?: NFTMetadata;
}

const style = {
	wrapper: `flex`,
	infoContainer: `h-36 flex flex-col flex-1 justify-between mb-6`,
	accent: `text-[#2081e2]`,
	nftTitle: `text-3xl font-extrabold`,
	otherInfo: `flex`,
	ownedBy: `text-[#8a939b] mr-4`,
	likes: `flex items-center text-[#8a939b]`,
	likeIcon: `mr-1`,
	actionButtonsContainer: `w-44`,
	actionButtons: `flex container justify-between text-[1.4rem] border-2 rounded-lg`,
	actionButton: `my-2`,
	divider: `border-r-2`,
}

export default function GeneralDetails({ selectedNFT }: GeneralDetailsProps) {
	return (
		<div className={style.wrapper}>
			<div className={style.infoContainer}>
				<div className={style.accent}>Bored Ape Yacht Club</div>
				<div className={style.nftTitle}>{ selectedNFT?.name }</div>
				
				<div className={style.otherInfo}>
					<div className={style.ownedBy}>
						Owned by <span className={style.accent}>e88vault</span>
					</div>

					<div className={style.likes}>
						<AiFillHeart className={style.likeIcon} />
						2.3k favorites
					</div>
				</div>
			</div>

			<div className="w-44">
				<div className="flex container justify-between text-[1.4rem] border-2 rounded-lg">
					<div className="my-2 ml-2">
						<MdRefresh />
					</div>

					<div className="border-r-2" />
					<div className="my-2">
						<RiShareBoxLine />
					</div>

					<div className="border-r-2" />
					<div className="my-2">
						<GiShare />
					</div>

					<div className="border-r-2" />
					<div className="my-2 mr-2">
						<FiMoreVertical />
					</div>
				</div>
			</div>
		</div>
	);
}
