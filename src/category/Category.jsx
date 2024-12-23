import cyber from "../assets/cyber.png";
import { Link } from "react-router-dom";

function Category({ Category, logo }) {
  let cat = Category.toUpperCase();
  return (
    <Link
      to={`/job?category=${Category}`}
      className="  shadow-md  ro  w-32 h-32 sm:w-32 sm:h-32  md:w-44 md:h-44 flex flex-col items-center justify-center "
    >
      <img
        className=" w-8 md:w-14 bg-[#bdd8d2] p-2 rounded-full mx-auto "
        src={logo}
        alt="sda"
      />
      <p className=" mt-3 text-center text-[8px] sm:text-[10px] md:text-sm font-semibold text-black">
        {cat}
      </p>
    </Link>
  );
}

export default Category;
