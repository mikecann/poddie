import * as React from "react";
import { Modal } from "antd";
import Search from "antd/lib/input/Search";
import { Vertical, VerticalSpacer } from "gls/lib";
import { AddPodcastModalSearchItem } from "../addPodcast/AddPodcastModalSearchItem";
import { atom, useAtom } from "jotai";
import { addPodcastModalIsOpenAtom } from "../addPodcast/AddPodcastModal";
import { Podcast } from "../features/podcasts";
import { useWindowSize } from "../utils/useWindowSize";

interface Props {}

export const podcastInfoModalIsOpenAtom = atom(false);
export const podcastInfoModalPodcastAtom = atom<Podcast | undefined>(undefined);

export const PodcastInfoModal: React.FC<Props> = ({}) => {
  const [isOpen, setIsOpen] = useAtom(podcastInfoModalIsOpenAtom);
  const [podcast] = useAtom(podcastInfoModalPodcastAtom);
  const { innerHeight, innerWidth } = useWindowSize();
  console.log("podcast", podcast);
  console.log("isOpen", isOpen);

  if (!podcast) return null;

  const { collectionName } = podcast;

  return (
    <Modal
      title={collectionName}
      visible={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      centered
      width={innerWidth - 100}
    >
      <pre
        style={{
          maxHeight: innerHeight - 150,
          overflow: "auto",
        }}
      >
        {JSON.stringify(podcast, null, 2)}
      </pre>
    </Modal>
  );
};
