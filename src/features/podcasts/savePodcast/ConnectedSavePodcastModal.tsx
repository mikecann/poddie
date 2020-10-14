import * as React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "../../../app/store";
import { closeModal } from "../../modals/modalsSlice";
import { addSavedPodcast } from "../podcastsSlice";
import { SavePodcastModal } from "./SavePodcastModal";
import { PodcastITunesInfo } from "../../../api/itunes/types";
import { searchPodcasts } from "../../../api/itunes/search";

interface Props {}

export const ConnectedSavePodcastModal: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();

  const {
    savePodcast: { isOpen },
  } = useSelector((state) => state.modals);

  const [searchTerm, setSearchTerm] = React.useState("");

  const [selectedPodcast, setSelectedPodcast] = React.useState<PodcastITunesInfo | null>(null);

  const { isLoading, error, data } = useQuery(["podcast-search", searchTerm], () =>
    searchPodcasts(searchTerm)
  );

  const close = () => dispatch(closeModal("savePodcast"));

  const onSaveSelectedPodcast = () => {
    if (!selectedPodcast) return;
    close();
    dispatch(addSavedPodcast(selectedPodcast));
  };

  return (
    <SavePodcastModal
      visible={isOpen}
      selectedItem={selectedPodcast}
      onSetSelectedItem={setSelectedPodcast}
      searchResults={data ?? []}
      isLoading={isLoading}
      error={error + ""}
      onSearch={setSearchTerm}
      onClose={close}
      onSaveSelectedPodcast={onSaveSelectedPodcast}
    />
  );
};
