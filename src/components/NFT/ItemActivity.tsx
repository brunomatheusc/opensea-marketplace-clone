import { useState } from "react";

import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { CgArrowsExchangeV } from "react-icons/cg";
import { dummyEvents } from "../../static/dummyEvents";
import EventItem from "../EventItem";

const style = {
	wrapper: `w-full mt-8 border border-[#151b22] rounded-xl bg-[#303339] overflow-hidden`,
	title: `bg-[#262b2f] px-6 py-4 flex items-center`,
	titleLeft: `flex-1 flex items-center text-xl font-bold`,
	titleIcon: `text-3xl mr-2`,
	titleRight: `text-xl`,
	filter: `flex items-center border border-[#151b22] mx-4 my-6 px-3 py-4 rounded-xl bg-[#363840]`,
	filterTitle: `flex-1`,
	tableHeader: `flex w-full bg-[#262b2f] border-y border-[#151b22] mt-8 px-4 py-1`,
	eventItem: `flex px-4`,
	ethLogo: `h-5 mr-2`,
	accent: `text-[#2081e2]`,
}

export default function ItemActivity() {
	const [toggle, setToggle] = useState(true);

	return (
		<div className="w-full mt-8 border border-[#151b22] rounded-xl bg-[#303339] overflow-hidden">
			<div className="bg-[#262b2f] px-6 py-4 flex items-center" onClick={() => setToggle((toggle) => !toggle)}>
				<div className="flex-1 flex items-center text-xl font-bold">
					<span className="text-3xl mr-2">
						<CgArrowsExchangeV />
					</span>
					Item Activity
				</div>

				<div className="text-xl">
					{ toggle ? <AiOutlineUp /> : <AiOutlineDown /> }
				</div>
			</div>

			{ toggle && (
			<div>
				<div className="flex items-center border border-[#151b22] mx-4 my-6 px-3 py-4 rounded-xl bg-[#363840]">
					<div className="flex-1">Filter</div>

					<div>
						{' '}
						<AiOutlineDown />
						{' '}
					</div>
				</div>

				<div className="flex w-full bg-[#262b2f] border-y border-[#151b22] mt-8 px-4 py-1">
					<div className="flex-[2]">Event</div>
					<div className="flex-[2]">Price</div>
					<div className="flex-[3]">From</div>
					<div className="flex-[3]">To</div>
					<div className="flex-[2]">Date</div>
				</div>

				{ dummyEvents.map((event, id) => (
				<EventItem key={`event-item-${id}`} event={event} />
				))}
			</div>
			)}
		</div>
	);
}
