import React from "react";
import { ForYouNews } from "../types/types";
import moment from "moment";
import { truncateText } from "../helpers/turncateText";
const RecommendedCard: React.FC<ForYouNews> = ({
  url,
  image,
  title,

  author,
  updatedAt,
}) => {
  return (
    <a href={url} target="_blank" className="unstyled-link">
      <div className="flex gap-2">
        <div className=" flex-1 flex flex-col gap-1 justify-between align-center mb-3">
          <p className="text-xs font-bold">{truncateText(author, 20)}</p>
          <p className="font-xs">{truncateText(title, 35)}</p>
          <p className="font-small text-muted">
            {moment(updatedAt).format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="flex-1 ">
          <img src={image} alt="" className="w-full rounded-xl" />
          {/* <div
            id="logo"
            className="recommended-news-image rounded-md overflow-hidden"
            style={{
              background: `url(${urlToImage})`,
            }}
          ></div> */}
        </div>
      </div>
    </a>
  );
};

export default RecommendedCard;
