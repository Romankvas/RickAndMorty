const STORAGE_KEY = "rickAndMortyWatchList";

export const getWatchList = () => {
  const watchList = localStorage.getItem(STORAGE_KEY);
  return watchList ? JSON.parse(watchList) : [];
};

export const saveWatchList = (watchList) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(watchList));
};

export const addToWatchList = (episode) => {
  const watchList = getWatchList();
  if (!watchList.find((item) => item.id === episode.id)) {
    watchList.push({
      ...episode,
      watched: false,
    });
    saveWatchList(watchList);
  }
};

export const removeFromWatchList = (episodeId) => {
  const watchList = getWatchList();
  const updatedList = watchList.filter((item) => item.id !== episodeId);
  saveWatchList(updatedList);
};

export const toggleWatched = (episodeId) => {
  const watchList = getWatchList();
  const updatedList = watchList.map((item) => {
    if (item.id === episodeId) {
      return { ...item, watched: !item.watched };
    }
    return item;
  });
  saveWatchList(updatedList);
};
