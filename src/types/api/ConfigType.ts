interface ResponseData<T = any> {
    data: T;
    dataList: T;
    page: any;
    resultCode: number;
    resultDesc: string;
}

export type ConfigType<T = any> = Promise<ResponseData<T>>