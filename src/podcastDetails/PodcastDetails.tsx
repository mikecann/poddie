import { Horizontal, Stretch, Vertical } from "gls/lib";
import * as React from "react";
import { Podcast, loadPodcastFeed } from "../features/podcasts";
import { useQuery } from "react-query";
import { PodcastDetailsFeedItem } from "./PodcastDetailsFeedItem";
import { Alert, Spin } from "antd";
import Icon, { InfoCircleOutlined } from "@ant-design/icons";
import { downloadEpisode } from "../features/downloads";
import { Item } from "rss-parser";
import { setFalse, setTrue } from "../utils/misc";
import { PodcastInfoModal } from "../podcastInfo/PodcastInfoModal";

interface Props {
  podcast: Podcast;
}

export const PodcastDetails: React.FC<Props> = ({ podcast }) => {
  const { collectionName, feedUrl } = podcast;

  const [seletedItemId, setSelectedItemId] = React.useState<string>();
  const [moreInfoOpen, setMoreInfoOpen] = React.useState(false);

  const { isLoading, error, data } = useQuery(["podcast-feed", feedUrl], () =>
    loadPodcastFeed(feedUrl)
  );

  const onPlayClicked = (episode: Item) => downloadEpisode(podcast, episode);

  return (
    <Vertical style={{ padding: 20, width: "100%" }} spacing={20}>
      <Horizontal width="100%">
        <Stretch>
          <h1 style={{ color: "white" }}>{collectionName}</h1>
        </Stretch>
        <InfoCircleOutlined
          style={{ fontSize: "2em", cursor: "pointer" }}
          onClick={setTrue(setMoreInfoOpen)}
        />
      </Horizontal>
      {isLoading && <Spin tip="Loading Feed..." />}
      {error && (
        <Alert message={"Feed Load Error!"} description={JSON.stringify(error)} type="error" />
      )}
      <Vertical spacing={5}>
        {data?.items?.map((item, i) => (
          <PodcastDetailsFeedItem
            key={i + " " + item.guid}
            isSelected={seletedItemId == item.guid}
            onSelect={() => setSelectedItemId(item.guid)}
            item={item}
            onPlayClicked={() => onPlayClicked(item)}
          />
        ))}
      </Vertical>

      <PodcastInfoModal
        podcast={podcast}
        isOpen={moreInfoOpen}
        onClose={setFalse(setMoreInfoOpen)}
      />
    </Vertical>
  );
};
