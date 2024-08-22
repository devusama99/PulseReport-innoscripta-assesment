import moment from "moment";

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

        <h4 className="font-semibold mt-2">
          {title.split("").slice(0, 50).join("") +
            (title.split("").length > 50 ? "..." : "")}
        </h4>
        <p className="news-desc font-xs">
          {description.split("").slice(0, 100).join("") +
            (description.split("").length > 100 ? "..." : " ")}
        </p>
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
