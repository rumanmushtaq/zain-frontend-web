let toastRef: any;

export const setToast = (toastFn: any) => {
  toastRef = toastFn;
};

export const showToast = (options: any) => {
  if (toastRef) {
    toastRef(options);
  }
};
