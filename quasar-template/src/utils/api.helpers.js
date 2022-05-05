import * as R from 'ramda';
export function transformToParamsString(params) {
  if (!R.is(Object, params)) return '';
  let paramsString = '?';
  Object.keys(params).map(key => {
    paramsString +=
      params[key] !== null && params[key] !== undefined && params[key] !== ''
        ? `${key}=${params[key]}&`
        : '';
  });
  paramsString = paramsString.slice(0, -1);
  paramsString = encodeURI(paramsString);
  paramsString = paramsString.replace(/#/g, '%23');
  paramsString = paramsString.replace(/\[/g, '%5B');
  paramsString = paramsString.replace(/\]/g, '%5D');
  return paramsString;
}
//Si el query viene con objectos, solo envia el value del objecto
export function emitOnlyValues(query) {
  return R.mapObjIndexed(
    el => (typeof el === 'object' && el !== null ? el.value : el),
    query,
  );
}
