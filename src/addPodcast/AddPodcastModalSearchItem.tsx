import { Button, Popover } from "antd";
import { Horizontal, HorizontalSpacer, Stretch, Vertical } from "gls/lib";
import * as React from "react";
import { Podcast } from "../features/podcasts";
import { InfoCircleOutlined } from "@ant-design/icons";

interface Props {
  podcast: Podcast;
  onSelect: () => any;
  isSelected: boolean;
}

export const AddPodcastModalSearchItem: React.FC<Props> = ({
  podcast,
  onSelect,
  isSelected,
}) => {
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
        backgroundColor: isSelected
          ? "rgba(255,255,255,0.1)"
          : over
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.03)",
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
        <Button>
          <InfoCircleOutlined />
        </Button>
      </Popover>
      <HorizontalSpacer space={20} />
    </Horizontal>
  );
};
