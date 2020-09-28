import { Horizontal, Stretch, Vertical, VerticalSpacer } from "gls/lib";
import * as React from "react";
import { Podcast, searchPodcasts } from "../features/podcasts";
import { useQuery } from "react-query";
import { loadPodcastFeed } from "../features/rss";
import { PodcastDetailsFeedItem } from "./PodcastDetailsFeedItem";
import { Alert, Spin } from "antd";
import Icon, { InfoCircleOutlined, InfoOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import {
  podcastInfoModalIsOpenAtom,
  podcastInfoModalPodcastAtom,
} from "../podcastInfo/PodcastInfoModal";

interface Props {
  podcast: Podcast;
}

export const PodcastDetails: React.FC<Props> = ({ podcast }) => {
  const { collectionName, feedUrl } = podcast;

  const [seletedItemId, setSelectedItemId] = React.useState<string>();
  const [_, setPodcastInfoModalIsOpen] = useAtom(podcastInfoModalIsOpenAtom);
  const [__, setPodcastInfoModalPodcast] = useAtom(podcastInfoModalPodcastAtom);

  const onInfoIconClicked = () => {
    setPodcastInfoModalPodcast(podcast);
    setPodcastInfoModalIsOpen(true);
  };

  const { isLoading, error, data } = useQuery(["podcast-feed", feedUrl], () =>
    loadPodcastFeed(feedUrl)
  );

  return (
    <Vertical style={{ padding: 20, width: "100%" }} spacing={20}>
      <Horizontal width="100%">
        <Stretch>
          <h1 style={{ color: "white" }}>{collectionName}</h1>
        </Stretch>
        <InfoCircleOutlined
          style={{ fontSize: "2em", cursor: "pointer" }}
          onClick={onInfoIconClicked}
        />
      </Horizontal>
      {isLoading && <Spin tip="Loading Feed..." />}
      {error && (
        <Alert
          message={"Feed Load Error!"}
          description={JSON.stringify(error)}
          type="error"
        />
      )}
      <Vertical spacing={5}>
        {data?.items?.map((item, i) => (
          <PodcastDetailsFeedItem
            key={i + " " + item.guid}
            isSelected={seletedItemId == item.guid}
            onSelect={() => setSelectedItemId(item.guid)}
            item={item}
          />
        ))}
      </Vertical>
    </Vertical>
  );
};
