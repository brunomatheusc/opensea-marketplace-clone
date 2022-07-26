import Image from 'next/image';
import Link from 'next/link';

import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

import openseaLogo from '../../assets/opensea.png';

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
			</div>
		</div>
	);
}
