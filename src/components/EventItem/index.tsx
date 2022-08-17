import { BsFillCartFill } from 'react-icons/bs'
import { dummyEvents } from "../../static/dummyEvents";

type DummyEvent = typeof dummyEvents[0];

interface EventItemProps {
	event: DummyEvent;
}

const style = {
	eventItem: `flex px-4 py-5 font-medium`,
	event: `flex items-center`,
	eventIcon: `mr-2 text-xl`,
	eventName: `text-lg font-semibold`,
	eventPrice: `flex items-center`,
	eventPriceValue: `text-lg`,
	ethLogo: `h-5 mr-2`,
	accent: `text-[#2081e2]`,
}

export default function EventItem({ event }: EventItemProps) {
	return (
		<div className="flex px-4 py-5 font-medium">
			<div className="flex items-center flex-[2]">
				<div className="mr-2 text-xl">
					<BsFillCartFill />
				</div>

				<div className="text-lg font-semibold">Sale</div>
			</div>

			<div className="flex items-center flex-[2]">
				<img src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" alt="eth" className="h-5 mr-2" />

				<div className="text-lg">{ event.price }</div>
			</div>

			<div className="text-[#2081e2] flex-[3]">{event.from}</div>
			
			<div className="text-[#2081e2] flex-[3]">{event.to}</div>

			<div className="text-[#2081e2] flex-[2]">{event.date}</div>
		</div>
	);
}
