import { ARWEAVE_GATEWAY, IPFS_GATEWAY } from "@/lib/constants";

export const sanitizedStorageUrl = (hash?: string): string => {
  if (!hash) {
    return "";
  }

  let link = hash.replaceAll(/^Qm[1-9A-Za-z]{44}/gm, `${IPFS_GATEWAY}${hash}`);
  link = link.replace("https://ipfs.io/ipfs/", IPFS_GATEWAY);
  link = link.replace("ipfs://ipfs/", IPFS_GATEWAY);
  link = link.replace("ipfs://", IPFS_GATEWAY);
  link = link.replace("ar://", ARWEAVE_GATEWAY);

  return link;
};
