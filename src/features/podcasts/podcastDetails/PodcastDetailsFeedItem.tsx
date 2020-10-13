import { Horizontal, Vertical, HorizontalSpacer, Stretch } from "gls/lib";
import * as React from "react";
import { Button, Popover } from "antd";
import { HeartOutlined, InfoCircleOutlined, PlayCircleFilled } from "@ant-design/icons";
import { Item } from "rss-parser";

interface Props {
  item: Item;
  onSelect: () => any;
  isSelected: boolean;
  onPlayClicked: () => any;
}

export const PodcastDetailsFeedItem: React.FC<Props> = ({
  item,
  onSelect,
  isSelected,
  onPlayClicked,
}) => {
  const [over, setOver] = React.useState(false);
  const { title, pubDate, content, enclosure } = item;

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
      {/* <img src={artworkUrl100} /> */}
      <HeartOutlined style={{ fontSize: "1.25em", cursor: "pointer", marginLeft: 10 }} />
      <Stretch>
        <Vertical>
          <h4 style={{ color: "white" }}>{title}</h4>
          {isSelected && <h5 style={{ color: "white" }}>{content}</h5>}
        </Vertical>
      </Stretch>
      {isSelected && (
        <PlayCircleFilled
          style={{ fontSize: "2em", cursor: "pointer", marginRight: 10 }}
          onClick={onPlayClicked}
        />
      )}
    </Horizontal>
  );
};
