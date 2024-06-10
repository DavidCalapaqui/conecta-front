
export interface IApiResponse<T> {
    data: T | null;
    message: string;
    ok: boolean;
    httpStatus: string;
}


export interface ICarDto {
    id?:number;
    plate: string;
    color: string;
    automaker: string;
    model: string;
    vim: string;
}

export interface ICirculation {
    canCirculate: boolean;
    carDto: ICarDto;
}

