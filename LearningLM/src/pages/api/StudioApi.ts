import axios from "axios";
//1.진입하기
export interface CreateFlowRequest {
  mode: string;
  tutorialId?: number | null;
  originFlowId?: number | null;
}

export interface CreateFlowResponse {
  code: string;
  message: string;
  result: {
    flowId: number;
    title: string;
    mode: string;
    status: string;
    createdAt: string;
  };
  success: boolean;
}

export const createFlow = async (
  data: CreateFlowRequest,
  accessToken?: string
): Promise<CreateFlowResponse> => {
  const response = await axios.post<CreateFlowResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/flows`,
    data,
    {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    }
  );

  return response.data;
};
//2. 편집하기 부분
export interface FlowCategory {
  categoryId: number;
  code: string;
  name: string;
}

export interface FlowBlock {
  flowBlockId: number;
  blockId: number;
  name: string;
  stage: string;
  blockOrder: number;
}

export interface GetFlowResult {
  flowId: number;
  title: string;
  summary: string;
  purpose: string;
  difficulty: string;

  categories: FlowCategory[];

  mode: string;
  flowType: string;
  visibility: string;
  status: string;

  authorNote: string;
  exampleInput: string;
  exampleResult: string;

  originFlowId: number;

  blockFlow: FlowBlock[];

  createdAt: string;
  updatedAt: string;
}

export interface GetFlowResponse {
  code: string;
  message: string;
  result: GetFlowResult;
  success: boolean;
}

export const getFlow = async (
  flowId: number,
  accessToken?: string
): Promise<GetFlowResponse> => {
  const response = await axios.get<GetFlowResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/flows/${flowId}`,
    {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    }
  );

  return response.data;
};
//3. 저장하기
export interface FlowUpdateBlock {
  blockId: number;
  blockOrder: number;
  options: Record<string, unknown>;
  promptTemplateId: number;
}

export interface FlowUpdateRequest {
  title: string;
  summary: string | null;
  purpose: string | null;
  difficulty: string | null;
  categoryIds: number[];
  visibility: string;
  status: string;
  authorNote: string | null;
  exampleInput: string | null;
  exampleResult: string | null;
  blocks: FlowUpdateBlock[];
}

export interface FlowUpdateResponse {
  code: string;
  message: string;
  result: {
    flowId: number;
    status: string;
    updatedAt: string;
  };
  success: boolean;
}

export const saveFlow = async (
  flowId: number,
  data: FlowUpdateRequest,
  accessToken?: string
): Promise<FlowUpdateResponse> => {
  const response = await axios.put<FlowUpdateResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/flows/${flowId}`,
    data,
    {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    }
  );

  return response.data;
};
//삭제 부분
export interface DeleteFlowResponse {
  code: string;
  message: string;
  result: {
    flowId: number;
    deleted: boolean;
  };
  success: boolean;
}

export const deleteFlow = async (
  flowId: number,
  accessToken?: string,
): Promise<DeleteFlowResponse> => {
  const response = await axios.delete<DeleteFlowResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/flows/${flowId}`,
    {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    }
  );

  return response.data;
};
//검증
export interface VerifyFlowBlock {
  blockId: number;
  blockOrder: number;
  input: Record<string, unknown>;
  options: Record<string, unknown>;
  resolvedContext: Record<string, unknown>;
}

export interface VerifyFlowRequest {
  blocks: VerifyFlowBlock[];
}

export interface VerifyFlowResultItem {
  ruleId: number;
  name: string;
  status: string;
  criteria: string;
  checkedResult: string;
  guide: string;
  targetStage: string;
}

export interface VerifyFlowResponse {
  code: string;
  message: string;
  result: {
    totalStatus: string;
    summary: {
      pass: number;
      insufficient: number;
      pending: number;
    };
    results: VerifyFlowResultItem[];
  };
  success: boolean;
}

export const verifyFlow = async (
  flowId: number,
  data: VerifyFlowRequest,
  accessToken?: string
): Promise<VerifyFlowResponse> => {
  const response = await axios.post<VerifyFlowResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/flows/${flowId}/verify`,
    data,
    {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    }
  );

  return response.data;
};

// 6. 예시 결과 생성(미리보기)

export interface PreviewFlowBlock {
  blockId: number;
  blockOrder: number;
  input: Record<string, unknown>;
  options: Record<string, unknown>;
  resolvedContext: Record<string, unknown>;
}

export interface PreviewFlowRequest {
  blocks: PreviewFlowBlock[];
}

export interface PreviewFlowResponse {
  code: string;
  message: string;
  result: {
    resultText: string;
    resultSource: string;
    modelName: string;
  };
  success: boolean;
}

export const previewFlow = async (
  flowId: number,
  data: PreviewFlowRequest,
  accessToken?: string
): Promise<PreviewFlowResponse> => {
  const response = await axios.post<PreviewFlowResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/flows/${flowId}/preview`,
    data,
    {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    }
  );

  return response.data;
};