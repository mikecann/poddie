import { Vertical } from "gls/lib";
import * as React from "react";
import { useQuery } from "react-query";
import { createPodcast, searchPodcasts } from "../features/podcasts";
import { backgroundColor } from "../styles";
import { SidebarPodcastItem } from "./SidebarPodcastItem";

interface Props {}

const tmpPodcast = createPodcast({
  name: "test posdcast",
});

export const Sidebar: React.FC<Props> = ({}) => {
  //searchPodcasts("anjuna");

  const searchTerm = "anjuna";

  const { isLoading, error, data } = useQuery(
    ["podcast-search", searchTerm],
    () => searchPodcasts(searchTerm)
  );

  if (isLoading) return <div>"Loading..."</div>;

  if (error) return <div>"An error has occurred: " + error</div>;

  console.log(data);

  return (
    <Vertical
      style={{
        width: 300,
        backgroundColor: backgroundColor.darken(0.05).toHexString(),
      }}
    >
      <SidebarPodcastItem podcast={tmpPodcast} />
      <SidebarPodcastItem podcast={tmpPodcast} />
      <SidebarPodcastItem podcast={tmpPodcast} />
    </Vertical>
  );
};
