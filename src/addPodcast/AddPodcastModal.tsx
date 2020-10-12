import * as React from "react";
import { searchPodcasts } from "../features/podcasts";
import { Modal } from "antd";
import Search from "antd/lib/input/Search";
import { Vertical, VerticalSpacer } from "gls/lib";
import { useQuery } from "react-query";
import { AddPodcastModalSearchItem } from "./AddPodcastModalSearchItem";
import { useStore } from "effector-react";
import { addSavedPodcast, closeModal, modalsStore } from "../state/app";

interface Props {}

export const AddPodcastModal: React.FC<Props> = ({}) => {
  const modals = useStore(modalsStore);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedPodcastId, setSelectedPodcastId] = React.useState<number>();

  const isOpen = modals.addPodcast.isOpen;
  const close = () => closeModal("addPodcast");

  const { isLoading, error, data } = useQuery(
    ["podcast-search", searchTerm],
    () => searchPodcasts(searchTerm)
  );

  const selectedPodcast = data?.find(
    (p) => p.collectionId == selectedPodcastId
  );

  const onAddPodcast = () => {
    if (!selectedPodcast) return;
    close();
    addSavedPodcast(selectedPodcast);
  };

  return (
    <Modal
      title="Add Podcast"
      visible={isOpen}
      onCancel={close}
      okButtonProps={{ disabled: !selectedPodcast }}
      onOk={onAddPodcast}
      centered
    >
      <Vertical>
        <Search
          placeholder="search itunes.."
          onSearch={setSearchTerm}
          style={{ width: "100%" }}
        />
        {isLoading && <div>Loading..</div>}
        {error && (
          <div>
            Whoops! <pre>{JSON.stringify(error)}</pre>
          </div>
        )}
        <VerticalSpacer space={20} />
        {data &&
          data.length > 0 &&
          data.map((pod) => (
            <AddPodcastModalSearchItem
              key={pod.collectionId}
              podcast={pod}
              isSelected={selectedPodcastId == pod.collectionId}
              onSelect={() => setSelectedPodcastId(pod.collectionId)}
            />
          ))}
      </Vertical>
    </Modal>
  );
};
