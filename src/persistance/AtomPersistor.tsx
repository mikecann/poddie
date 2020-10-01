import { useAtom, WritableAtom } from "jotai";
import * as React from "react";
import { addedPodcastsAtom } from "../features/podcasts";
import { queryCache } from "react-query";

interface Props {
  storageKey: string;
  atom: WritableAtom<any, any>;
}

export const AtomPersistor: React.FC<Props> = ({ atom, storageKey }) => {
  const [value, setValue] = useAtom(atom);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setValue(JSON.parse(localStorage.getItem(storageKey) ?? "[]"));
    setLoaded(true);
  }, [atom, storageKey]);

  React.useEffect(() => {
    if (!loaded) return;
    console.log(`${storageKey} saved`, atom);
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [atom, storageKey, value, loaded]);

  return null;
};
