export type MapAssetSource = {
  mapId: string;
  assetType: "cover" | "overview";
  sourceName: string;
  sourceUrl: string;
  sourcePageTitle: string;
  downloadedAt: string;
  originalFormat: "jpg" | "png";
  localPath: string;
};

const officialMapsPage = "Maps - VALORANT";
const downloadedAt = "2026-07-12";

function asset(
  mapId: string,
  assetType: MapAssetSource["assetType"],
  sourceUrl: string,
  originalFormat: MapAssetSource["originalFormat"]
): MapAssetSource {
  return {
    mapId,
    assetType,
    sourceName: "Official VALORANT Maps",
    sourceUrl,
    sourcePageTitle: officialMapsPage,
    downloadedAt,
    originalFormat,
    localPath: `/maps/2026-act-4/${mapId}/${assetType}.webp`
  };
}

export const mapAssetSources: MapAssetSource[] = [
  asset("ascent", "cover", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/5cb7e65c04a489eccd725ce693fdc11e99982e10-3840x2160.png?accountingTag=VAL", "png"),
  asset("ascent", "overview", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/a31ef0d024e1add0214eb49698ca13e58f62d17e-641x641.jpg?accountingTag=VAL", "jpg"),
  asset("breeze", "cover", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/430fb50965f1d99cdaef3588df13d98dbea340cf-930x522.png?accountingTag=VAL", "png"),
  asset("breeze", "overview", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/5e9322e5270fea63d82e956ba7d4ccffe95eb84a-515x515.png?accountingTag=VAL", "png"),
  asset("haven", "cover", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/bccc7b5f8647a4f654d4bb359247bce6e82c77ab-3840x2160.png?accountingTag=VAL", "png"),
  asset("haven", "overview", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/d9f3c040be38a8fc1f49f18d1221680419877c05-641x641.png?accountingTag=VAL", "png"),
  asset("lotus", "cover", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/67d199e0f7108bc60e8293d3f9a37538b0b55b11-3840x2160.png?accountingTag=VAL", "png"),
  asset("lotus", "overview", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/a660e638ac2a27d458ef22a6db17b3e372137d09-1873x1873.jpg?accountingTag=VAL", "jpg"),
  asset("split", "cover", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/878d51688c0f9dd0de827162e80c40811668e0c6-3840x2160.png?accountingTag=VAL", "png"),
  asset("split", "overview", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/dc8a607601339a6c79c8d144c93e17915cde8ac9-515x513.jpg?accountingTag=VAL", "jpg"),
  asset("sunset", "cover", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/5101e4ee241fbfca261bf8150230236c46c8b991-3840x2160.png?accountingTag=VAL", "png"),
  asset("sunset", "overview", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/699c33a4ee5f5daf71e87c0f3bf6ddf6995b4bb3-2000x2000.jpg?accountingTag=VAL", "jpg"),
  asset("summit", "cover", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/97986033c47822dad7ac5b1af24fa183b8b04983-915x515.jpg?accountingTag=VAL", "jpg"),
  asset("summit", "overview", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/36a3f67d05cd359fa6c3a4c1fea3ba6ed84cbc2e-515x515.jpg?accountingTag=VAL", "jpg")
];

