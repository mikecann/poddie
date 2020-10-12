import { useAtom, WritableAtom } from "jotai";
import * as React from "react";
import { addedPodcastsAtom } from "../features/podcasts";
import { queryCache } from "react-query";

interface Props<TValue> {
  storageKey: string;
  atom: WritableAtom<TValue, any>;
  defaultValue: TValue;
}

export function AtomPersistor<TValue>({
  atom,
  storageKey,
  defaultValue,
}: Props<TValue>) {
  const [value, setValue] = useAtom(atom);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    console.log(`${storageKey} loaded`, { atom, stored });
    //setValue(stored == undefined ? defaultValue : JSON.parse(stored));
    setLoaded(true);
  }, [atom, storageKey]);

  React.useEffect(() => {
    if (!loaded) return;
    console.log(`${storageKey} saved`, atom);
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [atom, storageKey, value, loaded]);

  return null;
}
