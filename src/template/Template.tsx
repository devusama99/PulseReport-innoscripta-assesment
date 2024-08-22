import { Button, Input, Layout, Modal } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Logo from "../assets/logo.png";
import {
  createSearchParams,
  Link,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Search } = Input;

const Template = () => {
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchAction = (value: string) => {
    setSearchModalOpen(false);
    navigate({
      pathname: "search",
      search: createSearchParams({ query: value }).toString(),
    });
  };
  return (
    <Layout>
      <Header className="sticky top-0" style={{ zIndex: 100 }}>
        <Modal
          title="Search Articles"
          open={searchModalOpen}
          onOk={() => setSearchModalOpen(true)}
          onCancel={() => setSearchModalOpen(false)}
          footer={<></>}
        >
          <Search
            placeholder="Search..."
            enterButton
            onSearch={searchAction}
            defaultValue={searchParams.get("query")?.toString()}
          />
        </Modal>
        <div className="w-full h-full flex items-center justify-between max-w-[1280px] mx-auto px-4 xl:px-0">
          <Link className="flex gap-2 items-center" to="/app">
            <img src={Logo} alt="Logo" width={"40px"} />
            <h4 className="text-xl font-bold text-primary logo-text">
              ReportPulse
            </h4>
          </Link>
          <div className=" items-center hidden md:flex">
            <Search
              placeholder="Search..."
              enterButton
              style={{ minWidth: 400 }}
              onSearch={searchAction}
              defaultValue={searchParams.get("query")?.toString()}
            />
          </div>
          <span className="flex items-center justify-end gap-2 md:hidden">
            <Button
              type="text"
              icon={<SearchOutlined />}
              className="md:hidden"
              onClick={() => setSearchModalOpen(true)}
            />
          </span>
        </div>
      </Header>
      <Content className="py-10 px-4">
        <Outlet />
      </Content>
      <Footer className="bg-primary">
        <p className="text-center w-full" style={{ color: "white" }}>
          All Rights Reserved by Muhammad Usama &#169;{" "}
          <span className="font-bold">PulseReport</span>
        </p>
      </Footer>
    </Layout>
  );
};

export default Template;
