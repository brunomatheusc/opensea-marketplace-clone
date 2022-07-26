import { styles } from './styles';

export default function Hero() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.contentWrapper}>
					<div className={styles.copyContainer}>
						<div className={styles.title}>
							Discover, collect and sell extraordinary NFTs
						</div>

						<div className={styles.description}>
							OpenSea is the world's first and largest NFT marketplace
						</div>

						<div className={styles.ctaContainer}>
							<button className={styles.accentedButton}>Explore</button>
							<button className={styles.button}>Create</button>
						</div>
					</div>

					<div className={styles.cardContainer}>
						<img src="https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s550" alt="" className="rounded-t-lg" />

						<div className={styles.infoContainer}>
							<img 
								src="https://lh3.googleusercontent.com/qQj55gGIWmT1EnMmGQBNUpIaj0qTyg4YZSQ2ymJVvwr_mXXjuFiHJG9d3MRgj5DVgyLa69u8Tq9ijSm_stsph8YmIJlJQ1e7n6xj=s64" 
								alt="" 
								className="h-[2.25rem] rounded-full"
							/>

							<div className={styles.author}>
								<div className={styles.name}>Jolly</div>

								<a
									className="text-[#1868b7]"
									href="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/2324922113504035910649522729980423429926362207300810036887725141691069366277"
								>
									hola-kanola
								</a>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
