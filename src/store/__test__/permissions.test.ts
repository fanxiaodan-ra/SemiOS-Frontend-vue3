import { Store, createPinia, setActivePinia } from 'pinia';
import { describe, beforeEach, it, afterEach, expect, vi } from 'vitest';
import usePermissionStore from '../permissions';

const mocks = vi.hoisted(() => {
  return {
    workPermissionDetail: vi.fn().mockResolvedValue({
      dataList: [
        {
          daoId: '655',
          daoName: 'unit',
          permissionType: 6,
          projectId: '0x10f0c2f9d12ebc8fa0e7c6147b6ff9a9ea09fcc8671ef366808f3ed59fa21b2c',
        },
        {
          daoId: '654',
          daoName: 'unit',
          permissionType: 9,
          projectId: '0x10f0c2f9d12ebc8fa0e7c6147b6ff9a9ea09fcc8671ef366808f3ed59fa21b2c',
        },
      ],
      page: {
        count: 212,
        order: 'ASC',
        orderBy: null,
        pageNo: 1,
        pageSize: 10,
      },
    }),
    workPermissionDetailNode: vi.fn().mockResolvedValue({
      dataList: [
        {
          daoNameNft: 'unit',
          erc721Token: '0x12c8b0a563440658feccaa5f53ffef41eac1c136',
          ownerAddress: '0xc26829df47f4b7f6c2b6a4b9f5beb581413d23e1',
          permissionType: 1,
          workId: 740,
          workNumber: 0,
        },
      ],
      page: {
        count: 212,
        order: 'ASC',
        orderBy: null,
        pageNo: 1,
        pageSize: 10,
      },
    }),
    workPermissionDetailNodeInfo: vi.fn().mockResolvedValue({
      data: {
        daoNameNft: 'unit',
        erc721Token: '0x12c8b0a563440658feccaa5f53ffef41eac1c136',
        isPermission: true,
        ownerAddress: '0xc26829df47f4b7f6c2b6a4b9f5beb581413d23e1',
        workId: 740,
        workNumber: 0,
      },
    }),
    myPermissions: vi.fn().mockResolvedValue({
      dataList: [
        {
          daoId: '655',
          daoName: 'unit',
          daoNameNft: 'unit',
          erc721Token: '0x12c8b0a563440658feccaa5f53ffef41eac1c136',
          permissionType: 1,
          projectId: '0x10f0c2f9d12ebc8fa0e7c6147b6ff9a9ea09fcc8671ef366808f3ed59fa21b2c',
          workId: 740,
          workNumber: 0,
        },
      ],
      page: {
        count: 212,
        order: 'ASC',
        orderBy: null,
        pageNo: 1,
        pageSize: 10,
      },
    }),
    userPermissionsNft: vi.fn().mockResolvedValue({
      dataList: [
        {
          bgColor: '#532FE7',
          daoNameNft: 'dao1101',
          erc721Token: '0xde5c9461e96e2640130f0ecfc22a1487e5206b06',
          height: 298,
          imgUrl: 'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/199/0-nft.png',
          permissionCount: 9,
          workId: 596,
          workNumber: 0,
        },
      ],
      page: {
        count: 212,
        order: 'ASC',
        orderBy: null,
        pageNo: 1,
        pageSize: 10,
      }
    }),
  };
});

beforeEach(() => {
  vi.mock('@/api/works', () => {
    return {
      workPermissionDetail: mocks.workPermissionDetail,
      workPermissionDetailNode: mocks.workPermissionDetailNode,
      workPermissionDetailNodeInfo: mocks.workPermissionDetailNodeInfo,
    };
  });
  vi.mock('@/api/user', () => {
    return {
      myPermissions: mocks.myPermissions,
      userPermissionsNft: mocks.userPermissionsNft,
    };
  });
});

describe('permissions', () => {
  let store: Store<"permissions", { myPermissions: { permissionType: number; daoId: string; daoName: string; projectId: string; workId: number; daoNameNft: string; workNumber: number; erc721Token: string; }[]; myPermissionsPageInfo: { pageNo: number; pageSize: number; totalItems: number; }; permissionList: { permissionType: number; daoId: string; daoName: string; projectId: string; workId: number; daoNameNft: string; workNumber: number; erc721Token: string; }[]; permissionListPageInfo: { pageNo: number; pageSize: number; }; }, {}, { getUserPermissions({ userAddress, pageNo }: { userAddress: string; pageNo: number; }): Promise<void>; getUserPermissionsNft({ workId }: { workId: number; }): Promise<any>; getNftPermissionInDetail(workId: number): Promise<{ nodeLink: string; nftsName: string; nftsLink: string; permissionName: string | number; permissionType: number; daoId: string; daoName: string; projectId: string; workId: number; daoNameNft: string; workNumber: number; erc721Token: string; }[] | undefined>; getPermissionListInDetail({ daoId }: { daoId: string; }): Promise<void>; getUserPermissionsNftInDetail({ daoId, permissionType }: { daoId: string; permissionType: number; }): Promise<any>; }>;
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    store = usePermissionStore();
  });
  afterEach(() => {
    store.$reset();
  });
  it('getUserPermissions', async () => {
    await store.getUserPermissions({
      userAddress: '0x1234567890',
      pageNo: 1,
    });
    expect(store.myPermissions).toEqual([
      {
        daoId: '655',
        daoName: 'unit',
        daoNameNft: 'unit',
        erc721Token: '0x12c8b0a563440658feccaa5f53ffef41eac1c136',
        permissionType: 1,
        projectId: '0x10f0c2f9d12ebc8fa0e7c6147b6ff9a9ea09fcc8671ef366808f3ed59fa21b2c',
        workId: 740,
        workNumber: 0,
        nodeLink: '/nodeDetails?id=655',
        nftsName: 'unit.0',
        nftsLink: '/workDetails?id=740',
        permissionName: 'SubNodes Edit Information Permission',
      },
    ]);
    
  })
  it('getUserPermissionsNft', async () => {
    const result = await store.getUserPermissionsNft({
      workId: 1,
    });
    expect(result).toEqual([
      {
        bgColor: '#532FE7',
        daoNameNft: 'dao1101',
        erc721Token: '0xde5c9461e96e2640130f0ecfc22a1487e5206b06',
        height: 298,
        imgUrl: 'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/199/0-nft.png',
        permissionCount: 9,
        workId: 596,
        workNumber: 0,
      },
    ])
  }),
  it('getNftPermissionInDetail', async () => {
    const result = await store.getNftPermissionInDetail(1);
    expect(result).toEqual([
      {
        daoId: '655',
        daoName: 'unit',
        permissionType: 6,
        projectId: '0x10f0c2f9d12ebc8fa0e7c6147b6ff9a9ea09fcc8671ef366808f3ed59fa21b2c',
        nodeLink: '/daoCollectionAnalytics?id=655',
        nftsName: 'undefined.undefined',
        nftsLink: '/workDetails?id=undefined',
        permissionName: 'Seed Nodes Edit Information Permission',
      },
      {
        daoId: "654",
        daoName: "unit",
        nftsLink: "/workDetails?id=undefined",
        nftsName: "undefined.undefined",
        nodeLink: "/daoCollectionAnalytics?id=654",
        permissionName: "",
        permissionType: 9,
        projectId: "0x10f0c2f9d12ebc8fa0e7c6147b6ff9a9ea09fcc8671ef366808f3ed59fa21b2c",
      },
    ]);
  }),
  it('getPermissionListInDetail', async () => {
    await store.getPermissionListInDetail({
      daoId: '655',
    });
    expect(store.permissionList).toEqual([
      {
        daoNameNft: 'unit',
        erc721Token: '0x12c8b0a563440658feccaa5f53ffef41eac1c136',
        permissionType: 1,
        ownerAddress: "0xc26829df47f4b7f6c2b6a4b9f5beb581413d23e1",
        workId: 740,
        workNumber: 0,
        nodeLink: '/nodeDetails?id=undefined',
        nftsName: 'unit.0',
        nftsLink: '/workDetails?id=740',
        permissionName: 'SubNodes Edit Information Permission',
      },
    ]);
  }),
  it('getUserPermissionsNftInDetail', async () => {
    const result = await store.getUserPermissionsNftInDetail({
      daoId: '655',
      permissionType: 1,
    });
    expect(result).toEqual({
      daoNameNft: 'unit',
      erc721Token: '0x12c8b0a563440658feccaa5f53ffef41eac1c136',
      isPermission: true,
      ownerAddress: '0xc26829df47f4b7f6c2b6a4b9f5beb581413d23e1',
      workId: 740,
      workNumber: 0,
    });
  });
});