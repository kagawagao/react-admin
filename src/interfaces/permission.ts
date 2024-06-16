export interface FullUri {
  uri: string;
  method: string;
}

export type Uri = string | FullUri;

export type PermissionType = 'MENU' | 'OPERATE';

export interface UserPermission {
  /**
   * permission code
   */
  code: string;
  /**
   * permission name
   *
   * used to be displayed in the UI or upload to the server
   */
  name?: string;
  /**
   * parent permission code
   */
  parent?: string;
  /**
   * permission type
   */
  type?: PermissionType;
  /**
   * permission description
   *
   * used to be displayed in the UI or upload to the server
   */
  description?: string;
  /**
   * permission groups
   */
  groups?: string[];
  /**
   * permission uris
   *
   * if the uri is a string, it means the uri is a full uri with get method
   */
  uris?: Uri[];
  /**
   * extend data
   */
  data?: any;
}
