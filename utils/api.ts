import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Update with your backend API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getCode = async (userId: string) => {
  try {
    console.log(userId)
    const response = await api.get(`/code/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch code");
  }
};

export const saveCode = async (
  fileName: string,
  code: string,
  userId: string
) => {
  try {
    await api.post("/code", { fileName: fileName, code: code, userId: userId });
    console.log("Code saved successfully");
  } catch (error) {
    throw new Error("Failed to save code");
  }
};

export const runCode = async (code: string) => {
  try {
    const response = await axios.post("/api/runCOde", { code });
    return response.data.output;
  } catch (error) {
    throw new Error("Code execution failed.");
  }
};
