/*************************************************/
/*               ===  WARNING  ===               */
/* The code in this file is extremely unreadable */
/*************************************************/

type StringData = Record<string, boolean>;

export default function classnames(...params: (StringData | string)[]): string {
  const objParam = params.filter((each) => typeof each === 'object') as unknown as StringData[];
  const stringParam: string[] = params.filter((each) => typeof each === 'string') as unknown as string[];
  const objStringParam: string[] = [];
  objParam.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        objStringParam.push(key);
      }
    });
  });
  return [...stringParam, ...objStringParam].join(' ');
}
