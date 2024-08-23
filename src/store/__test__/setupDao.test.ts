import { Store, createPinia, setActivePinia } from 'pinia';
import { describe, it, afterEach, expect, vi } from 'vitest';
import useSetupDaoStore from '../setupDao';

const mocks = vi.hoisted(() => {
  return {
    inquireNft0AndDaoIdWithResolved: vi.fn().mockResolvedValueOnce({
      data: {
        "daoId": 1,
        "workId": 1,
        "imgUrl": "www.lazaro-bechtelar.name",
        "bgColor": "xpev7m",
        "height": 60.37
      }
    }),
    inquireNft0AndDaoIdWithPending: vi.fn().mockResolvedValueOnce({
      data: {
        "daoId": null,
        "workId": null,
        "imgUrl": '',
        "bgColor": '',
        "height": null
      }
    }).mockResolvedValueOnce({
      data: {
        "daoId": 1,
        "workId": 1,
        "imgUrl": "www.lazaro-bechtelar.name",
        "bgColor": "xpev7m",
        "height": 60.37
      }
    }),
  };
});


describe('setupDao', () => {
  let store: Store<"setupDao", { workId: null; daoId: null; nft0Info: { imgUrl: string; height: number; bgColor: string; }; }, {}, { inquireNft0AndDaoId({ transactionHash }: { transactionHash: string; }): Promise<unknown>; }>
  afterEach(() => {
    store.$reset();
    vi.clearAllMocks();
  });
  it('inquireNft0AndDaoId with resolved correct values', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    store = useSetupDaoStore() as any;
    vi.useFakeTimers();
    vi.mock('@/api/works', () => {
      return {
        inquireNft0AndDaoId: mocks.inquireNft0AndDaoIdWithResolved,
      };
    });
    
    await store.inquireNft0AndDaoId({ transactionHash: '0x123' });
    expect(store.workId).toBe(1);
    expect(store.daoId).toBe(1);
    expect(store.nft0Info).toEqual({
      imgUrl: 'www.lazaro-bechtelar.name',
      height: 60.37,
      bgColor: 'xpev7m',
    });
  })
});
