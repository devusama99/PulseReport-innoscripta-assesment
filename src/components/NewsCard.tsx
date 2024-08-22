import moment from "moment";
import { truncateText } from "../helpers/turncateText";

interface NewsCard {
  image: string;
  title: string;
  description: string;
  updatedAt: string;
  author: string;
  url: string;
  category?: string;
}

const NewsCard: React.FC<NewsCard> = ({
  image,
  title,
  description,
  updatedAt,
  author,
  url,
  category,
}) => {
  return (
    <a href={url} target="_blank" className="unstyled-link">
      <div className="px-1">
        <img
          src={image}
          alt="news-img"
          className="rounded-md"
          width={"100%"}
          style={{ maxHeight: 180 }}
        />

        <h4 className="font-semibold mt-2">{truncateText(title, 50)}</h4>
        <p className="news-desc font-xs">{truncateText(description, 100)}</p>
        <p className="font-small flex item-center gap-1 mt-2">
          <span className="text-primary truncate">
            {category ? category : author},
          </span>
          <span>{moment(updatedAt).format("DD/MM/YYYY")}</span>
        </p>
      </div>
    </a>
  );
};

export default NewsCard;
