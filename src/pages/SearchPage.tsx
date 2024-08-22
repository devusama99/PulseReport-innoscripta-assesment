import { FilterOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Pagination,
  DatePicker,
  Select,
  Spin,
  message,
} from "antd";
import NewsCard from "../components/NewsCard";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchArticle } from "../apis/api";
import { ITEMSPERPAGE, SORTOPTIONS } from "../data/data";
import { PopularNews } from "../types/types";
import dayjs, { Dayjs } from "dayjs";

const SearchPage = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [articles, setArticles] = useState<PopularNews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sortBy, setSortBy] = useState<"relevance" | "newest" | "oldest">(
    "relevance"
  );

  const [searchParams] = useSearchParams();

  const disabledDate = (current: Dayjs, end: boolean) => {
    // Can not select days before today and today
    if (end) {
      if (startDate)
        return (
          current < dayjs(startDate).endOf("day") ||
          current > dayjs().endOf("day")
        );
      else return current > dayjs().endOf("day");
    }
    if (startDate) return current > dayjs().endOf("day");
    else return current > dayjs().endOf("day");
  };

  const searchActions = async () => {
    setLoading(true);
    setShowFilters(false);
    const response: any = await searchArticle(
      searchParams.get("query"),
      pageNo,
      ITEMSPERPAGE,
      sortBy,
      startDate?.toISOString(),
      endDate?.toISOString()
    );

    setLoading(false);
    if (response.total) {
      setTotalItems(response.total);
      setArticles(response.data);
      setPageNo(response.currentPage);
      window.scrollTo(0, 0);
    } else {
      message.error("Something went wrong. Please try again after some time!");
    }
  };

  useEffect(() => {
    searchActions();
  }, [searchParams, pageNo]);
  return (
    <div className="max-w-[1280px] mx-auto min-h-screen">
      <Spin spinning={loading} fullscreen />
      <Modal
        open={showFilters}
        okText="Show Results"
        onCancel={() => setShowFilters(false)}
        onOk={() => {
          setPageNo(1);
          searchActions();
        }}
      >
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="start-date">Start Date</label>
            <DatePicker
              id="start-date"
              className="w-full"
              value={startDate}
              onChange={(date: Date) => setStartDate(date)}
              disabledDate={(current) => disabledDate(current, false)}
              format={"DD/MM/YYYY"}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="end-date">End Date</label>
            <DatePicker
              id="end-date"
              className="w-full"
              value={endDate}
              onChange={(date: Date) => setEndDate(date)}
              disabledDate={(current) => disabledDate(current, true)}
              format={"DD/MM/YYYY"}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="categories">Categories</label>
            <Select
              placeholder="Please select categories"
              options={SORTOPTIONS}
              value={sortBy}
              onChange={(value) => setSortBy(value)}
              id="categories"
              className="w-full"
            />
          </div>
        </div>
      </Modal>
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Results</h2>
        <Button onClick={() => setShowFilters(true)} icon={<FilterOutlined />}>
          Filters
        </Button>
      </div>
      {!articles.length ? (
        <div className="mt-10 text-2xl font-weight-bold text-center  flex items-center justify-center min-h-[400px]">
          Nothing to Show !
        </div>
      ) : (
        <>
          <div className="grid grid-cols-12 gap-4 mt-5">
            {articles.map((article: PopularNews) => (
              <div
                className="col-span-6 md:col-span-4 lg:col-span-3"
                key={article.id}
              >
                <NewsCard
                  title={article.title}
                  author={article.category}
                  updatedAt={article.updatedAt}
                  image={
                    article.image
                      ? article.image
                      : "http://www.jasminauburn.com.au/wp-content/themes/jasmine-family-restaurent/images/noimage.png"
                  }
                  url={article.url}
                  description={article.description}
                />
              </div>
            ))}
          </div>
          <div className="mt-7 flex justify-center">
            <Pagination
              defaultCurrent={1}
              total={totalItems}
              pageSize={ITEMSPERPAGE}
              showSizeChanger={false}
              onChange={(page: number) => setPageNo(page)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
