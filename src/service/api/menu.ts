import { ServicePrefixEnum } from '@/enum/commonEnum';
import { RequestEnum } from '@/enum/httpEnum';
import { request } from '../request';

/**
 * 创建菜单
 *
 */

export function createMenu(data: Api.SystemManage.Menu) {
  return request<Api.Auth.LoginData>({
    url: `${ServicePrefixEnum.MENU}`,
    method: RequestEnum.POST,
    data
  });
}

/**
 * 删除菜单
 *
 */

export function deleteMenu(id: number) {
  return request<Api.Auth.LoginData>({
    url: `${ServicePrefixEnum.MENU}/${id}`,
    method: RequestEnum.DELETE
  });
}
