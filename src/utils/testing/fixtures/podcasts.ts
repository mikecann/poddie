import { PodcastITunesInfo } from "../../../api/itunes/types";
import { SavedPodcast } from "../../../features/podcasts/podcastsSlice";

export const exampleSavedPodcasts: SavedPodcast[] = [
  {
    id: "123",
    episodesLoadState: {
      lastLoadAt: 0,
      status: "not-loaded",
    },
    itunesInfo: {
      name: "Illusionary Images Podcast",
      wrapperType: "track",
      kind: "podcast",
      collectionId: 619286812,
      trackId: 619286812,
      artistName: "Blugazer",
      collectionName: "Illusionary Images Podcast",
      trackName: "Illusionary Images Podcast",
      collectionCensoredName: "Illusionary Images Podcast",
      trackCensoredName: "Illusionary Images Podcast",
      collectionViewUrl:
        "https://podcasts.apple.com/us/podcast/illusionary-images-podcast/id619286812?uo=4",
      feedUrl: "https://blugazer.libsyn.com/rss",
      trackViewUrl:
        "https://podcasts.apple.com/us/podcast/illusionary-images-podcast/id619286812?uo=4",
      artworkUrl30:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts/v4/17/e3/10/17e310d5-dfaa-f699-88f2-d44a5d57b6df/mza_7437077443245937963.jpg/30x30bb.jpg",
      artworkUrl60:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts/v4/17/e3/10/17e310d5-dfaa-f699-88f2-d44a5d57b6df/mza_7437077443245937963.jpg/60x60bb.jpg",
      artworkUrl100:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts/v4/17/e3/10/17e310d5-dfaa-f699-88f2-d44a5d57b6df/mza_7437077443245937963.jpg/100x100bb.jpg",
      collectionPrice: 0,
      trackPrice: 0,
      trackRentalPrice: 0,
      collectionHdPrice: 0,
      trackHdPrice: 0,
      trackHdRentalPrice: 0,
      releaseDate: new Date("2020-10-02T00:07:00Z"),
      collectionExplicitness: "cleaned",
      trackExplicitness: "cleaned",
      trackCount: 91,
      country: "USA",
      currency: "USD",
      primaryGenreName: "Music",
      contentAdvisoryRating: "Clean",
      artworkUrl600:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts/v4/17/e3/10/17e310d5-dfaa-f699-88f2-d44a5d57b6df/mza_7437077443245937963.jpg/600x600bb.jpg",
      genreIds: ["1310", "26"],
      genres: ["Music", "Podcasts"],
    },
  },
  {
    id: "456",
    episodesLoadState: {
      lastLoadAt: 0,
      status: "not-loaded",
    },
    itunesInfo: {
      name: "Illusionary Images Podcast",
      wrapperType: "track",
      kind: "podcast",
      collectionId: 879507964,
      trackId: 879507964,
      artistName: "Anjunadeep",
      collectionName: "The Anjunadeep Edition",
      trackName: "The Anjunadeep Edition",
      collectionCensoredName: "The Anjunadeep Edition",
      trackCensoredName: "The Anjunadeep Edition",
      collectionViewUrl:
        "https://podcasts.apple.com/us/podcast/the-anjunadeep-edition/id879507964?uo=4",
      feedUrl: "http://static.anjunadeep.com/edition/podcast.xml",
      trackViewUrl: "https://podcasts.apple.com/us/podcast/the-anjunadeep-edition/id879507964?uo=4",
      artworkUrl30:
        "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/88/ba/05/88ba052d-8361-d635-9868-743921b908dc/mza_51257023204342782.png/30x30bb.jpg",
      artworkUrl60:
        "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/88/ba/05/88ba052d-8361-d635-9868-743921b908dc/mza_51257023204342782.png/60x60bb.jpg",
      artworkUrl100:
        "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/88/ba/05/88ba052d-8361-d635-9868-743921b908dc/mza_51257023204342782.png/100x100bb.jpg",
      collectionPrice: 0,
      trackPrice: 0,
      trackRentalPrice: 0,
      collectionHdPrice: 0,
      trackHdPrice: 0,
      trackHdRentalPrice: 0,
      releaseDate: new Date("2020-10-08T03:00:00Z"),
      collectionExplicitness: "cleaned",
      trackExplicitness: "cleaned",
      trackCount: 296,
      country: "USA",
      currency: "USD",
      primaryGenreName: "Music",
      contentAdvisoryRating: "Clean",
      artworkUrl600:
        "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/88/ba/05/88ba052d-8361-d635-9868-743921b908dc/mza_51257023204342782.png/600x600bb.jpg",
      genreIds: ["1310", "26"],
      genres: ["Music", "Podcasts"],
    },
  },
];

export const examplePodcastItunesInfo: PodcastITunesInfo[] = [
  {
    name: "Illusionary Images Podcast",
    wrapperType: "track",
    kind: "podcast",
    collectionId: 619286812,
    trackId: 619286812,
    artistName: "Blugazer",
    collectionName: "Illusionary Images Podcast",
    trackName: "Illusionary Images Podcast",
    collectionCensoredName: "Illusionary Images Podcast",
    trackCensoredName: "Illusionary Images Podcast",
    collectionViewUrl:
      "https://podcasts.apple.com/us/podcast/illusionary-images-podcast/id619286812?uo=4",
    feedUrl: "https://blugazer.libsyn.com/rss",
    trackViewUrl:
      "https://podcasts.apple.com/us/podcast/illusionary-images-podcast/id619286812?uo=4",
    artworkUrl30:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts/v4/17/e3/10/17e310d5-dfaa-f699-88f2-d44a5d57b6df/mza_7437077443245937963.jpg/30x30bb.jpg",
    artworkUrl60:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts/v4/17/e3/10/17e310d5-dfaa-f699-88f2-d44a5d57b6df/mza_7437077443245937963.jpg/60x60bb.jpg",
    artworkUrl100:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts/v4/17/e3/10/17e310d5-dfaa-f699-88f2-d44a5d57b6df/mza_7437077443245937963.jpg/100x100bb.jpg",
    collectionPrice: 0,
    trackPrice: 0,
    trackRentalPrice: 0,
    collectionHdPrice: 0,
    trackHdPrice: 0,
    trackHdRentalPrice: 0,
    releaseDate: new Date("2020-10-02T00:07:00Z"),
    collectionExplicitness: "cleaned",
    trackExplicitness: "cleaned",
    trackCount: 91,
    country: "USA",
    currency: "USD",
    primaryGenreName: "Music",
    contentAdvisoryRating: "Clean",
    artworkUrl600:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts/v4/17/e3/10/17e310d5-dfaa-f699-88f2-d44a5d57b6df/mza_7437077443245937963.jpg/600x600bb.jpg",
    genreIds: ["1310", "26"],
    genres: ["Music", "Podcasts"],
  },
  {
    name: "Illusionary Images Podcast",
    wrapperType: "track",
    kind: "podcast",
    collectionId: 879507964,
    trackId: 879507964,
    artistName: "Anjunadeep",
    collectionName: "The Anjunadeep Edition",
    trackName: "The Anjunadeep Edition",
    collectionCensoredName: "The Anjunadeep Edition",
    trackCensoredName: "The Anjunadeep Edition",
    collectionViewUrl:
      "https://podcasts.apple.com/us/podcast/the-anjunadeep-edition/id879507964?uo=4",
    feedUrl: "http://static.anjunadeep.com/edition/podcast.xml",
    trackViewUrl: "https://podcasts.apple.com/us/podcast/the-anjunadeep-edition/id879507964?uo=4",
    artworkUrl30:
      "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/88/ba/05/88ba052d-8361-d635-9868-743921b908dc/mza_51257023204342782.png/30x30bb.jpg",
    artworkUrl60:
      "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/88/ba/05/88ba052d-8361-d635-9868-743921b908dc/mza_51257023204342782.png/60x60bb.jpg",
    artworkUrl100:
      "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/88/ba/05/88ba052d-8361-d635-9868-743921b908dc/mza_51257023204342782.png/100x100bb.jpg",
    collectionPrice: 0,
    trackPrice: 0,
    trackRentalPrice: 0,
    collectionHdPrice: 0,
    trackHdPrice: 0,
    trackHdRentalPrice: 0,
    releaseDate: new Date("2020-10-08T03:00:00Z"),
    collectionExplicitness: "cleaned",
    trackExplicitness: "cleaned",
    trackCount: 296,
    country: "USA",
    currency: "USD",
    primaryGenreName: "Music",
    contentAdvisoryRating: "Clean",
    artworkUrl600:
      "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/88/ba/05/88ba052d-8361-d635-9868-743921b908dc/mza_51257023204342782.png/600x600bb.jpg",
    genreIds: ["1310", "26"],
    genres: ["Music", "Podcasts"],
  },
];
