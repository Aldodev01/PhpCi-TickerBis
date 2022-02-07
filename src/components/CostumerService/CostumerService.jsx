import { Button, Space, Tooltip, List, Avatar, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import cs from "../../assets/lottie/cs.json";
import { JSONCostumerService } from "../../json";
import "./CostumerService.less";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const CostumerService = () => {
  const [clicked, setClicked] = useState(false);
  const [list, setList] = useState({
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    onclick: () => {
      setClicked(!clicked);
    },
    animationData: cs,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onLoadMore = () => {
    setList({
      ...list,
      loading: true,
      list: list.data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      ),
    });
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const data = list.data.concat(res.results);
        setList({ ...list, data, list: data, loading: false }, () => {
          window.dispatchEvent(new Event("resize"));
        });
      });
  };

  const loadMore =
    !list.initLoading && !list.loading ? (
      <Button type="primary" className="w100" onClick={onLoadMore}>
        loading more
      </Button>
    ) : null;

  const LoadMoreList = () => {
    return (
      <List
        className="demo-loadmore-list"
        loading={list.initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={JSONCostumerService.data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-more" href={item.link} target={"_blank"}>
                more
              </a>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={<a href="https://instagram.com/aldodevv">{item.nama}</a>}
                description={
                  <p
                    style={{
                      color: item.status == "Online" ? "#5e34aa" : "#ed0678",
                    }}
                  >
                    {item.status}
                  </p>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    );
  };

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setList({
          ...list,
          initLoading: false,
          data: res.results,
          list: res.results,
        });
      });
  }, []);
  return (
    <>
      {clicked && (
        <div
          className="needed-costumer-service"
          style={{
            transform: clicked ? "translateY(0px)" : "translateY(250px)",
            transitionDuration: "5s",
            position: "fixed",
          }}
        >
          <LoadMoreList />
        </div>
      )}
      <Tooltip title="Otak ngelag ? Butuh Bantuan ?" color={"magenta"}>
        <div
          className="costumer-service"
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          <Lottie options={defaultOptions} width="100%" height="100%" />
        </div>
      </Tooltip>
    </>
  );
};

export default CostumerService;
