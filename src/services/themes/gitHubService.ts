import { Endpoints } from '../../constants/Endpoints';
import { ApiTheme } from '../../interfaces/ApiTheme';

/**
 * Fetches theme data stored on github via jsdelivr cache.
 *
 * @param themeId id of theme to fetch data for
 */
const getGitHubThemeData = async (apiTheme: ApiTheme) => {
  const themeId = apiTheme.id;
  const cdnUrl = Endpoints.fetchCacheThemes;

  // fetch meta info
  const metaFile = 'meta.json';
  const metaUrl = `${cdnUrl}/${themeId}/${metaFile}`;
  const meta = await (await fetch(metaUrl)).json();

  const contentUrl = `${cdnUrl}/${themeId}/${meta.version}`;

  // fetch contents
  const displayFile = 'display.png';
  const settingsFile = 'settings.json';
  const inlineStylesFile = 'styles.json';
  const cssStylesFile = 'styles.css';

  const displayUrl = `${contentUrl}/${displayFile}`;
  const settingsUrl = `${contentUrl}/${settingsFile}`;
  const inlineStylesUrl = `${contentUrl}/${inlineStylesFile}`;
  const cssStylesUrl = `${contentUrl}/${cssStylesFile}`;

  // todo: fetch from github url (can use jsdelivr cache too)

  const authorImg = `https://avatars.githubusercontent.com/${meta.github}`;

  // todo: explore whether tags should be stored in database or via meta.json on github
  const tags = ['beta'];

  return {
    authorImg,
    authorName: meta.author,
    content: {
      cssStyles: cssStylesUrl,
      inlineStyles: inlineStylesUrl,
      settings: settingsUrl,
    },
    description: meta.description,
    favoritesCount: apiTheme.favoritesCount,
    github: meta.github,
    id: themeId,
    isFavorite: apiTheme.isFavorite ?? false,
    name: meta.name,
    tags,
    themeImg: displayUrl,
    version: meta.version,
  };
};

export { getGitHubThemeData };
