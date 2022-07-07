declare module '@alicloud/fnf-2019-03-15' {
  type StartExecutionRequestParams = {
    FlowName: string;
    RequestId?: string;
    ExecutionName?: string;
    Input?: string;
    CallbackFnFTaskToken?: string;
  };
  type StartExecutionResponse = {
    Name: string;
    FlowName: string;
    requestId: string;
    status: string;
    StartedTime: string;
    Output: string;
  };

  export default class FnFClient {
    constructor(options: {
      endpoint: string;
      accessKeyId: string;
      accessKeySecret: string;
    });
    /**
     * @param {String} RequestId - RequestId. optional.
     * @param {String} FlowName - FlowName. required.
     * @param {String} ExecutionName - ExecutionName. optional.
     * @param {String} Input - Input. optional.
     * @param {String} CallbackFnFTaskToken - CallbackFnFTaskToken. optional.
     */
    startExecution(
      params: StartExecutionRequestParams,
      options?: any
    ): Promise<StartExecutionResponse>;
  }
}
