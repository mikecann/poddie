import { Button, Popover } from "antd";
import { Horizontal, HorizontalSpacer, Stretch, Vertical } from "gls/lib";
import * as React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { PodcastITunesInfo } from "../../../api/itunes/types";

interface Props {
  podcast: PodcastITunesInfo;
  onSelect: () => any;
  isSelected: boolean;
}

export const SavePodcastModalSearchItem: React.FC<Props> = ({ podcast, onSelect, isSelected }) => {
  const [over, setOver] = React.useState(false);
  const { artworkUrl100, collectionName } = podcast;
  return (
    <Horizontal
      spacing={20}
      onClick={onSelect}
      onMouseOver={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
      style={{
        cursor: isSelected ? undefined : "pointer",
        backgroundColor: isSelected ? "rgba(0,0,0,0.1)" : over ? "rgba(0,0,0,0.02)" : "white",
      }}
      verticalAlign="center"
    >
      <img src={artworkUrl100} />
      <Stretch>
        <Vertical verticalAlign="center">
          <h4>{collectionName}</h4>
        </Vertical>
      </Stretch>
      <Popover
        placement="top"
        content={
          <pre style={{ width: 500, maxHeight: 300, overflowY: "auto" }}>
            {JSON.stringify(podcast, null, 2)}
          </pre>
        }
      >
        <Button style={{ marginRight: 10 }}>
          <InfoCircleOutlined />
        </Button>
      </Popover>
    </Horizontal>
  );
};
