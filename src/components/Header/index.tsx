import Image from 'next/image';
import Link from 'next/link';

import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

import openseaLogo from '../../assets/opensea.png';
import { APP_CONFIG } from '../../config';

import { styles } from './styles';

export default function Header() {
	return (
		<div className={styles.wrapper}>
			<Link href="/">
				<div className={styles.logoContainer}>
					<Image src={openseaLogo} height={40} width={40} />

					<div className={styles.logoText}>Opensea</div>
				</div>
			</Link>

			<div className={styles.searchBar}>
				<div className={styles.searchIcon}>
					<AiOutlineSearch />
				</div>

				<input 
					type="text" 
					className={styles.searchInput} 
					placeholder="Search items, collections and accounts"
				/>
			</div>

			<div className={styles.headerItems}>
				<Link href={`/collections/${APP_CONFIG.COLLECTION_ADDRESS}`}>
					<div className={styles.headerItem}>Collections</div>
				</Link>

				<Link href="/stats">
					<div className={styles.headerItem}>Stats</div>
				</Link>

				<Link href="/resources">
					<div className={styles.headerItem}>Resources</div>
				</Link>

				<Link href="/create">
					<div className={styles.headerItem}>Create</div>
				</Link>

				<Link href="/profile">
					<div className={styles.headerIcon}><CgProfile /></div>
				</Link>

				<Link href="/wallet">
					<div className={styles.headerIcon}><MdOutlineAccountBalanceWallet /></div>
				</Link>

			</div>
		</div>
	);
}
