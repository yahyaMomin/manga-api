import { fail, success } from './response';

const handler = (fn) => {
  return async (c, next) => {
    try {
      const result = await fn(c, next);
      return success(c, result, null);
    } catch (error) {
      console.log(error.message);
      if (error.statusCode) {
        return fail(c, error.message, error.statusCode, error.details);
      }
      return fail(c, 'internal server error', 500);
    }
  };
};
export default handler;
