import request from '../utils/request';

export async function fetchInfo(uid) {
  return request(`/api/users/${uid}`);
}
