import React from "react";
import { TopStoryNews } from "../types/types";
import moment from "moment";

const HeaderCard: React.FC<TopStoryNews> = ({
  image,
  title,
  description,
  updateAt,
  category,
  url,
}) => {
  return (
    <a href={url} target="_blank" className="unstyled-link">
      <div className="flex items-center grid grid-cols-12">
        <img
          src={image ? image : ""}
          alt="img"
          className="head-card-img rounded-xl col-span-12 md:col-span-6 "
        />
        <div className=" mt-4 md:px-4 flex flex-col justify-between col-span-12 md:col-span-6 h-full  ">
          <div>
            <h4 className="text-2xl font-bold">{title}</h4>
            <p className="my-2 opacity-60">{description}</p>
          </div>
          <div className="mb-2">
            <p className="mb-1 opacity-30">
              Updated: {moment(updateAt).format("dd/mm/yyyy")}
            </p>
            <p>
              <span className="text-primary">{category}</span>
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default HeaderCard;
