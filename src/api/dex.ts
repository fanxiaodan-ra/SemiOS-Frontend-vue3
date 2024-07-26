// import { service } from './request'
import service from './request'

const erc20Owners = async (data: any) => {
  return service({
    url: `/dex-api/royalty/erc20/owners`,
    method: "POST",
    data: data,
  });
};
const assetPool = async (data: any) => {
  return service({
    url: `/dex-api/royalty/price/asset_pool`,
    method: "POST",
    data: data,
  });
};
const assetPoolPrice = async (data: any) => {
  return service({
    url: `/dex-api/burn/asset_pool/price`,
    method: "POST",
    data: data,
  });
};
const assetPoolEth = async (data: any) => {
  return service({
    url: `/dex-api/burn/asset_pool/eth`,
    method: "POST",
    data: data,
  });
};
const transaction = async (data: any) => {
  return service({
    url: `/dex-api/liquidity/transaction`,
    method: "POST",
    data: data,
  });
};
const liquidityPrice = async (data: any) => {
  return service({
    url: `/dex-api/liquidity/price`,
    method: "POST",
    data: data,
  });
};
const liquidityDefault = async () => {
  return service({
    url: `/dex-api/liquidity/default`,
    method: "POST",
  });
};
const assetPoolInfo = async (data: any) => {
  return service({
    url: `/dex-api/burn/asset_pool/info`,
    method: "POST",
    data: data,
  });
};
const liquidityErc20Token = async (data: any) => {
  return service({
    url: `/dex-api/liquidity/erc20_token`,
    method: "POST",
    data: data,
  });
};
const getApy = async (data: any) => {
  return service({
    url: `/dex-api/liquidity/price/apy`,
    method: "POST",
    data: data,
  });
};
export {
  erc20Owners,
  assetPool,
  assetPoolEth,
  transaction,
  assetPoolPrice,
  liquidityPrice,
  liquidityDefault,
  assetPoolInfo,
  liquidityErc20Token,
  getApy,
}
