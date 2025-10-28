import { ServicePrefixEnum } from '@/enum/commonEnum';
import { request } from '../request';

/**
 * 创建用户
 *
 */

export function createUser(data: Api.Auth.CreateUser) {
  return request<Api.Auth.LoginData>({
    url: `${ServicePrefixEnum.USER}`,
    method: 'post',
    data
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/users',
    method: 'get',
    params
  });
}
