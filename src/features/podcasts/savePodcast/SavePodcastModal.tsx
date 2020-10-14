import * as React from "react";
import { Alert, Modal } from "antd";
import Search from "antd/lib/input/Search";
import { Vertical, VerticalSpacer } from "gls/lib";
import { SavePodcastModalSearchItem } from "./SavePodcastModalSearchItem";
import { PodcastITunesInfo } from "../../../api/itunes/types";

interface Props {
  visible: boolean;
  onClose: () => any;
  selectedItem: PodcastITunesInfo | null;
  onSaveSelectedPodcast: () => any;
  onSearch: (term: string) => any;
  onSetSelectedItem: (item: PodcastITunesInfo) => any;
  isLoading?: boolean;
  error?: string;
  searchResults: PodcastITunesInfo[];
}

export const SavePodcastModal: React.FC<Props> = ({
  visible,
  onClose,
  selectedItem,
  onSaveSelectedPodcast,
  onSearch,
  onSetSelectedItem,
  isLoading,
  error,
  searchResults,
}) => {
  return (
    <Modal
      title="Add Podcast"
      visible={visible}
      onCancel={onClose}
      okButtonProps={{ disabled: !selectedItem }}
      onOk={onSaveSelectedPodcast}
      centered
    >
      <Vertical spacing={20}>
        <Search
          placeholder="search itunes.."
          onSearch={onSearch}
          style={{ width: "100%" }}
          loading={isLoading}
        />
        {error && <Alert message="Error" description={JSON.stringify(error)} type="error" />}
        {searchResults &&
          searchResults.length > 0 &&
          searchResults.map((pod) => (
            <SavePodcastModalSearchItem
              key={pod.collectionId}
              podcast={pod}
              isSelected={selectedItem?.collectionId == pod.collectionId}
              onSelect={() => onSetSelectedItem(pod)}
            />
          ))}
      </Vertical>
    </Modal>
  );
};
