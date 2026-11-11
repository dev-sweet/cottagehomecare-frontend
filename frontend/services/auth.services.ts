import client from "@/lib/axios";
import {
  ApiResponse,
  AuthResponseData,
  LoginPayload,
  RegisterPayload,
  UserProfile,
} from "@/lib/types";

export const registerUser = async (
  payload: RegisterPayload
): Promise<ApiResponse<AuthResponseData>> => {
  const response = await client.post("/api/auth/register", payload);
  return response.data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<ApiResponse<AuthResponseData>> => {
  const response = await client.post("/api/auth/login", payload);
  return response.data;
};

export const getCurrentUser = async (): Promise<
  ApiResponse<{ user: UserProfile }>
> => {
  const response = await client.get("/api/auth/me");
  return response.data;
};

export const refreshToken = async (
  token?: string
): Promise<ApiResponse<{ accessToken: string; refreshToken?: string }>> => {
  const response = await client.post("/api/auth/refresh-token", {
    refreshToken: token,
  });
  return response.data;
};

export const logoutUser = async (
  token?: string
): Promise<ApiResponse<null>> => {
  const response = await client.post("/api/auth/logout", {
    refreshToken: token,
  });
  return response.data;
};

