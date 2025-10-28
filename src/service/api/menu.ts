import { ServicePrefixEnum } from '@/enum/commonEnum';
import { RequestEnum } from '@/enum/httpEnum';
import { request } from '../request';

/**
 * 创建菜单
 *
 */

export function createMenu(data: Api.SystemManage.CreateMenu) {
  return request<Api.CommonResponse<any>>({
    url: `${ServicePrefixEnum.MENU}`,
    method: RequestEnum.POST,
    data
  });
}
/**
 * 创建菜单
 *
 */

export function updateMenu(data: Api.SystemManage.UpdateMenu) {
  return request<Api.Auth.LoginData>({
    url: `${ServicePrefixEnum.MENU}/${data.id}`,
    method: RequestEnum.PATCH,
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
/**
 * 获取菜单路由名称
 *
 */
export function getMenuRouteNameList() {
  return request<Api.CommonResponse<string[]>>({
    url: `${ServicePrefixEnum.MENU}/route-names`,
    method: RequestEnum.GET
  });
}
