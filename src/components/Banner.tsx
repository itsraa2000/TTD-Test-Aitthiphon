import "../assets/css/App.css";

function Banner() {
  return (
    <div className="banner-containner max-w-full h-[635px] mt-[80px] ">
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-[48px] font-bold leading-[72px] drop-shadow-[0_3px_3px_rgba(0,0,0,0.50)]">Lorem ipsum dolor sit amet consectetur.</h2>
          <p className="text-white text-[32px] font-medium leading-[48px] drop-shadow-[0_3px_3px_rgba(0,0,0,0.50)]">
            One-stop Platform community for Agents and Operator in Thailand.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
