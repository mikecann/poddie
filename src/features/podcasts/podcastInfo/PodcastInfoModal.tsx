import * as React from "react";
import { Modal } from "antd";
import { useWindowSize } from "../../../utils/useWindowSize";
import { PodcastITunesInfo } from "../../../api/itunes/types";

interface Props {
  visible: boolean;
  podcast: PodcastITunesInfo;
  onClose: () => any;
}

export const PodcastInfoModal: React.FC<Props> = ({ visible, podcast, onClose }) => {
  const { innerHeight, innerWidth } = useWindowSize();

  if (!podcast) return null;

  const { collectionName } = podcast;

  return (
    <Modal
      title={collectionName}
      visible={visible}
      onCancel={onClose}
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
