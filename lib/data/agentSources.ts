export type AgentAssetSource = {
  agentId: string;
  sourceName: string;
  sourceUrl: string;
  sourcePageTitle: string;
  downloadedAt: string;
  originalFormat: "png";
  localPath: string;
};

const downloadedAt = "2026-07-13";

function portrait(agentId: string, sourceUrl: string, sourcePageTitle: string): AgentAssetSource {
  return {
    agentId,
    sourceName: "Official VALORANT Agent Page",
    sourceUrl,
    sourcePageTitle,
    downloadedAt,
    originalFormat: "png",
    localPath: `/agents/${agentId}/portrait.webp`
  };
}

export const agentAssetSources: AgentAssetSource[] = [
  portrait("chamber", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/e0411bbb14b69f7ce3d18b56fcf33649fdcc6a4b-5120x1772.png?accountingTag=VAL", "Chamber"),
  portrait("cypher", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/c5fc45f615ff1f0ca2ea71a69510316639c49ad7-5120x1772.png?accountingTag=VAL", "Cypher"),
  portrait("deadlock", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/806fdea778ca34a6afe8ec5d7a074e36a09b0036-5120x1772.png?accountingTag=VAL", "Deadlock"),
  portrait("killjoy", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/d1a10ef502d13649e803119b02b7c9917bfc860c-5120x1772.png?accountingTag=VAL", "Killjoy"),
  portrait("sage", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/ded53d6f127a00074675eb79fde95437f2c2f521-5120x1772.png?accountingTag=VAL", "Sage"),
  portrait("veto", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/f1a49f1ba67e2ec108b372810aa1f2135216836f-5120x1772.png?accountingTag=VAL", "Veto"),
  portrait("vyse", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/baa1f0d6255d92329812f6a689193536b4093db4-5120x1772.png?accountingTag=VAL", "Vyse")
];
