import forbiddenImg from "../assets/stop.jpg";

function Prohibited() {
  return (
    <div>
      <div className="flex flex-col h-screen items-center justify-center">
        <h2 className="text-center font-bold text-red-600 text-3xl ">
          This Product is not Created By you !!!
        </h2>
        <img className="w-60" src={forbiddenImg} alt="forbidden" />
      </div>
    </div>
  );
}

export default Prohibited;
