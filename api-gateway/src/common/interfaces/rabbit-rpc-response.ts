export type IRabbitRpcResponse =
  | {
      status: 'success';
      data: any;
    }
  | {
      status: 'error';
      code: string;
      reason: string;
    };
