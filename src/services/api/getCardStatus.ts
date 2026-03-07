import { noAuth } from "../../hook/authAxios";

export interface CardStatus {
  username: string;
  isActivated: boolean;
}

export interface CardStatusResponse {
  success: boolean;
  data: CardStatus;
  message?: string;
}

export const getCardStatus = async (username: string): Promise<CardStatusResponse> => {
  const response = await noAuth.get(`/api/card/${username}/status`);
  return response.data;
};
