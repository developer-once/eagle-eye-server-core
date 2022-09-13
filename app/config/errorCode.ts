export default {
  // ------------------ App_key ------------------
  100: () => {
    return {
      code: 100,
      data: "",
      msg: '缺少 app_key',
    }
  },
  101: () => {
    return {
      code: 101,
      data: "",
      msg: 'app_key 不合法',
    }
  },
  200: (data: any) => {
    return {
      code: 200,
      data,
      msg: 'success',
    };
  },
  // ------------------ Server ------------------
  500: (data: any) => {
    return {
      code: 500,
      data: data,
      msg: "服务端错误",
    }
  }
}