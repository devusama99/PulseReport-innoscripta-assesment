import React from "react";
import { ForYouNews } from "../types/types";
import moment from "moment";
const RecommendedCard: React.FC<ForYouNews> = ({
  url,
  urlToImage,
  title,

  author,
  updatedAt,
}) => {
  return (
    <a href={url} target="_blank" className="unstyled-link">
      <div className="flex gap-1">
        <div className=" flex-1 flex flex-col gap-1 justify-between align-center mb-3">
          <p className="text-xs font-bold">{author}</p>
          <p className="font-xs">{title}</p>
          <p className="font-small text-muted">
            {moment(updatedAt).format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="flex-1 flex items-center gap-1">
          <img src={urlToImage} alt="" className="w-full" />
          <div
            id="logo"
            className="recommended-news-image rounded-md overflow-hidden"
            style={{
              background: `url(${urlToImage})`,
            }}
          ></div>
        </div>
      </div>
    </a>
  );
};

export default RecommendedCard;
