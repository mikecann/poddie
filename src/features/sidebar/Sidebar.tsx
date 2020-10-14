import { Button } from "antd";
import { Vertical } from "gls/lib";
import * as React from "react";
import { backgroundColor } from "../../styles";
import { SidebarPodcastItem } from "./SidebarPodcastItem";
import { useDispatch, useSelector } from "../../app/store";
import { openModal } from "../modals/modalsSlice";
import { selectPodcast } from "../podcasts/podcastsSlice";

interface Props {}

export const Sidebar: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const { savedPodcasts, selectedPodcastId } = useSelector((state) => state.podcasts);

  const onAddPodcastClicked = () => dispatch(openModal("savePodcast"));

  return (
    <Vertical
      style={{
        width: 300,
        backgroundColor: backgroundColor.darken(0.05).toHexString(),
      }}
    >
      {Object.values(savedPodcasts).map((p) => (
        <SidebarPodcastItem
          key={p.id}
          podcast={p}
          isSelected={p.id == selectedPodcastId}
          onSelect={() => dispatch(selectPodcast(p.id))}
        />
      ))}
      <Vertical style={{ padding: 10 }}>
        <Button onClick={onAddPodcastClicked}>Add Podcast</Button>
      </Vertical>
    </Vertical>
  );
};
