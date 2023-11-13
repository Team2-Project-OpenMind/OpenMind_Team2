export const pathState = () => {
  const pathName = window.location.pathname;
  if (pathName.indexOf('/post') > -1) {
    return true;
  } else {
    return false;
  }
};
