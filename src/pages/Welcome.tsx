import { Button, Carousel, Spin, Tag, message } from "antd";
import Onboard1 from "../assets/onboard/onboard-1.jpg";
import Onboard2 from "../assets/onboard/onboard-2.jpg";
import Onboard3 from "../assets/onboard/onboard-3.jpg";
import Logo from "../assets/logo.png";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { newsCategories } from "../data/data";
import { getCategoriesSources } from "../apis/api";
import { Source } from "../types/types";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const onBoardImages = [Onboard1, Onboard2, Onboard3];

  const [onboardStage, setOnboardStage] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [loadingSources, setLoadingSources] = useState<boolean>(true);

  const [sources, setSources] = useState<Source[][]>([]);
  const [selectedSources, setSelectedSources] = useState<Source[]>([]);

  const nextDisabled = () => {
    if (onboardStage === 2 && !selectedCategories.length) return true;
    else if ((loadingSources || !selectedSources.length) && onboardStage === 3)
      return true;
    else return false;
  };
  const handleNext = async (stage: number) => {
    setOnboardStage(stage);
    if (stage === 3) {
      setLoadingSources(true);
      setSources([]);
      setSelectedSources([]);
      const response = await getCategoriesSources(selectedCategories);
      if (response) {
        setSources(response);
        setLoadingSources(false);
      } else {
        message.error({
          content: "Error getting sources. Please try again after sometime!!",
        });
      }
    } else if (stage === 4) {
      localStorage.setItem("sources", JSON.stringify(selectedSources));
      localStorage.setItem("categories", JSON.stringify(selectedCategories));
      navigate("/app");
    }
  };

  // Onboarding Screens Content
  const renderOnboardingStage = () => {
    switch (onboardStage) {
      case 1:
        return (
          <p className="my-5 text-xl  text-muted logo-text">
            Welcome to PulseReport! We're excited to have you join our community
            where staying informed is both simple and engaging. PulseReport
            harnesses the power of open-source APIs to deliver a comprehensive,
            real-time news experience that is both diverse and reliable. Our
            mission is to provide you with accurate and up-to-date information
            from around the world, ensuring you stay at the forefront of current
            events with clarity and ease.
          </p>
        );
      case 2:
        return (
          <>
            <div className="my-5 text-xl text-muted logo-text">
              <p>
                To enhance your news experience, please select your favorite
                categories. Whether you’re interested in business,
                entertainment, general news, health, science, sports, or
                technology, choosing your topics will help us deliver the most
                relevant updates just for you. Simply click your interests, and
                we’ll take care of the rest.
              </p>

              <div className="mt-2">
                {newsCategories.map((category) => (
                  <Tag.CheckableTag
                    checked={selectedCategories.includes(category.value)}
                    key={category.value}
                    onChange={(checked) => {
                      if (checked)
                        setSelectedCategories([
                          ...selectedCategories,
                          category.value,
                        ]);
                      else
                        setSelectedCategories(
                          selectedCategories.filter(
                            (item) => item !== category.value
                          )
                        );
                    }}
                    className="capitalize ma-none"
                  >
                    {category.label}
                  </Tag.CheckableTag>
                ))}
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="my-5 text-xl text-muted logo-text">
              <p>
                To further personalize your news experience, please select your
                preferred sources. Whether you have favorite news outlets,
                trusted journalists, or specific media platforms, choosing your
                sources will ensure you receive updates from the places you
                value most. Just pick your preferred sources, and we’ll
                customize your news feed accordingly.
              </p>

              <div className="mt-4">
                {loadingSources ? (
                  <div className="my-2 flex justify-center">
                    <Spin tip="Loading"></Spin>
                  </div>
                ) : (
                  sources.map((categorySource, i) => (
                    <div key={i} className="mb-3">
                      <p className="font-semibold text-base capitalize ">
                        {selectedCategories[i]}
                      </p>
                      {categorySource.map((source: Source) => (
                        <Tag.CheckableTag
                          checked={
                            !!selectedSources.filter(
                              (item) => item.id === source.id
                            ).length
                          }
                          key={source.id}
                          onChange={(checked) => {
                            if (checked)
                              setSelectedSources([...selectedSources, source]);
                            else
                              setSelectedSources(
                                selectedSources.filter(
                                  (item) => item.id !== source.id
                                )
                              );
                          }}
                          className="capitalize ma-none border"
                        >
                          {source.name}
                        </Tag.CheckableTag>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("sources")) navigate("/app");
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col-reverse md:flex-row">
        <div className="h-100 flex-1 hidden lg:block">
          <Carousel
            dotPosition="right"
            infinite
            autoplay
            effect="fade"
            className="overflow-hidden h-screen  "
            style={{ width: "100%" }}
          >
            {onBoardImages.map((onboardImage, index) => (
              <div
                className="onboard-image-container h-full bg-red-400"
                key={index}
              >
                <img src={onboardImage} alt={"onboard-" + index} className="" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="h-full w-full flex-1 flex items-center justify-center min-h-screen px-10">
          <div>
            <div className="flex items-center justify-center gap-2">
              <img src={Logo} alt="Logo" style={{ width: "50px" }} />
              <h1 className="text-2xl font-bold text-primary logo-text">
                PulseReport
              </h1>
            </div>
            {renderOnboardingStage()}

            <div
              className={`flex ${
                onboardStage > 1 ? "justify-between" : "justify-end"
              }`}
            >
              {onboardStage > 1 ? (
                <Button
                  type="link"
                  icon={<ArrowLeftOutlined />}
                  iconPosition="start"
                  onClick={() => setOnboardStage(onboardStage - 1)}
                >
                  Back
                </Button>
              ) : (
                <></>
              )}
              {onboardStage < 4 ? (
                <Button
                  type="link"
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                  onClick={() => handleNext(onboardStage + 1)}
                  disabled={nextDisabled()}
                >
                  Next
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
