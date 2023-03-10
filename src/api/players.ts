import HTTP from "@/configs/axios/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IData, IDetails, IRequest, IResponse } from "@/modules/players/interfaces/IPlayers";
import qs from "qs";

async function getPlayers(params: IRequest = {}, config?: AxiosRequestConfig): Promise<AxiosResponse<IResponse>> {
    return await HTTP.get<IResponse>("/Player/GetPlayers", {
        params,
        paramsSerializer: params => qs.stringify(params),
        ...config
    });
}

async function getPlayer(id: number): Promise<AxiosResponse<IDetails>> {
    return await HTTP.get<IDetails>("/Player/Get", { params: { id } });
}

async function getPositions(): Promise<AxiosResponse<string[]>> {
    return await HTTP.get<string[]>("/Player/GetPositions");
}

async function addPlayer(data: Omit<IData, "id">): Promise<AxiosResponse<IData>> {
    return await HTTP.post<IData>("/Player/Add", data);
}

async function editPlayer(data: Omit<IData, "id">): Promise<AxiosResponse<IData>> {
    return await HTTP.put<IData>("/Player/Update", data);
}

async function removePlayer(id: number): Promise<AxiosResponse<IData>> {
    return await HTTP.delete<IData>("/Player/Delete", { params: { id } });
}

export {
    removePlayer,
    getPositions,
    editPlayer,
    getPlayers,
    getPlayer,
    addPlayer
};
