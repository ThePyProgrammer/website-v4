export function TimelineItem({ iconUrl, title, timeline, focused, onClick }: { iconUrl: string; title: string; timeline: string, focused: boolean, onClick: () => void }) {
    return (
        <li className="relative flex flex-col gap-2 h-28 mb-4" onClick={onClick}>
            <div
            className={`relative flex items-center gap-8 py-3 pl-4 pr-8 shadow-lg rounded-xl border-blue-gray-50 shadow-blue-gray-900/5 max-w-md${focused ? " bg-gray-900" : " bg-black"}`}>
                <span
                className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full">
                    <img src={iconUrl} alt={title}
                        className="relative inline-block h-20 w-20 !rounded-full border-2 border-gray-900 object-cover object-center" />
                </span>
                <div className="flex flex-col gap-1">
                <h6
                    className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    {title}
                </h6>
                <p className="block font-sans text-md antialiased font-normal leading-normal text-gray-400">
                    {timeline}
                </p>
                </div>
            </div>
        </li>
    )
}