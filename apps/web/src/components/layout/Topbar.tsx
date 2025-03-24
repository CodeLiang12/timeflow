import signature from "@/assets/signature.svg";

export default function topBar() {
  return (
    <div className="w-100vw h-[65px] min-h-[65px] px-[20px] shadow-md relative z-[2]">
      <div className="max-w-[3840px] mx-auto h-full flex justify-between items-center">
        <img
          src={signature}
          alt="signature"
          className="h-[38px]"
        />
        <div className="h-[45px] w-[45px] rounded-full bg-blue-300"></div>
      </div>
    </div>
  );
}
