import {contextApi} from './ContextApi';

export const UserGet = async () => {
  try {
    const result = await contextApi(`/datauser/list.php`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};
