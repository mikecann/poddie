import { useAtom } from "jotai";
import * as React from "react";
import { addedPodcastsAtom } from "../features/podcasts";

interface Props {}

const key = `savedPodcasts`;

export const Persistor: React.FC<Props> = ({}) => {
  const [savedPods, setSavedPods] = useAtom(addedPodcastsAtom);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setSavedPods(JSON.parse(localStorage.getItem(key) ?? "[]"));
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    if (!loaded) return;
    console.log(`Podcasts saved`, addedPodcastsAtom);
    localStorage.setItem(key, JSON.stringify(savedPods));
  }, [savedPods, loaded]);

  return null;
};
