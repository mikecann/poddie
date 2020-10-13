import * as React from "react";
import { Modal } from "antd";
import Search from "antd/lib/input/Search";
import { Vertical, VerticalSpacer } from "gls/lib";
import { useQuery } from "react-query";
import { SavePodcastModalSearchItem } from "./SavePodcastModalSearchItem";
import { useDispatch, useSelector } from "../../../app/store";
import { closeModal } from "../../modals/modalsSlice";
import { addSavedPodcast } from "../podcastsSlice";
import { searchPodcasts } from "../podcasts";

interface Props {}

export const SavePodcastModal: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const {
    savePodcast: { isOpen },
  } = useSelector((state) => state.modals);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedPodcastId, setSelectedPodcastId] = React.useState<number>();

  const close = () => dispatch(closeModal("savePodcast"));

  const { isLoading, error, data } = useQuery(["podcast-search", searchTerm], () =>
    searchPodcasts(searchTerm)
  );

  const selectedPodcast = data?.find((p) => p.collectionId == selectedPodcastId);

  const onAddPodcast = () => {
    if (!selectedPodcast) return;
    close();
    dispatch(addSavedPodcast(selectedPodcast));
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
        <Search placeholder="search itunes.." onSearch={setSearchTerm} style={{ width: "100%" }} />
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
            <SavePodcastModalSearchItem
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
