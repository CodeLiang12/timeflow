const allHours = Array.from({ length: 24 }, (_, index) => {
  return index > 9 ? index : `0${index}`
})

export default function TimelineHour() {
  return (
    <div className="min-w-[2160px] bg-white border-b flex items-center justify-start relative">
      {allHours.map((hour) => (
        <div 
          key={hour} 
          className="w-[90px] h-[30px] flex flex-col items-center justify-start relative"
        >
          <span className="text-sm text-gray-500">{hour}:00</span>
          <div className="absolute bottom-[-5px] w-px h-[8px] bg-gray-300"></div>
          <div className="absolute bottom-0 left-0 right-0 w-full h-px bg-gray-200"></div>
        </div>
      ))}
    </div>
  )
}