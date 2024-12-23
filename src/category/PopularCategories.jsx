import Category from "./Category";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import bank from "../assets/icons/bank.png";
import coding from "../assets/icons/coding.png";
import food from "../assets/icons/food-restaurant.png";
import gov from "../assets/icons/government.png";
import grad from "../assets/icons/graduation-cap.png";
import ngo from "../assets/icons/ngo.png";
import soldier from "../assets/icons/soldier.png";
import stocks from "../assets/icons/stocks.png";
import support from "../assets/icons/support.png";
import logistics from "../assets/icons/logistics.png";
import healthcare from "../assets/icons/healthcare.png";
import community from "../assets/icons/community.png";

function PopularCategories() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <div className="  pb-14 pt-8 bg-[#F6F7FA]">
        <h2
          data-aos="zoom-in"
          className=" mb-6 text-center text-xl sm:text-2xl  drop-shadow-lg   font-bold text-black"
        >
          Popular Categories
        </h2>
        <div className="">
          <div
            data-aos="fade"
            className=" container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6  gap-y-8  cursor-pointer   justify-items-center justify-self-center"
          >
            <Category logo={coding} Category={"it-computer"} />
            <Category logo={bank} Category={"bank-finance"} />
            <Category logo={ngo} Category={"ngo-ingo"} />
            <Category logo={stocks} Category={"sales-marketing"} />
            <Category logo={gov} Category={"government"} />
            <Category logo={soldier} Category={"army-police"} />
            <Category logo={support} Category={"cooperative"} />
            <Category logo={grad} Category={"school-college"} />
            <Category logo={healthcare} Category={"healthcare"} />
            <Category logo={food} Category={"hotel-restaurant"} />
            <Category logo={community} Category={"customer_care"} />
            <Category logo={logistics} Category={"logistics-supply_chain"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularCategories;
