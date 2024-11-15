import { includes } from "./polyfills";
interface Permission {
  name: string;
  crudRoles: string[];
}

export const isAllowed = (
  userRole: string,
  permissionName: string,
  allowedTabs: Permission[],
) => {
  const permissions: Permission[] = allowedTabs;
  const permission = permissions.find((p) => p.name === permissionName);
  return permission ? true : false;
};

export const isCrudAllowed = (
  userRole: string,
  type: string,
  permissionName: string,
  allowedTabs: Permission[],
  allowedUserTabs: any,
) => {
  const permissions: any = allowedTabs;
  const permission = permissions.find(
    (p: { name: string }) => p.name === permissionName,
  );
  const roleAllowed = permission && includes(permission.allowedRoles, userRole);
  const userPermission = allowedUserTabs.find(
    (p: { name: string }) => p.name === permissionName,
  );
  const givePermissions = includes(userPermission.crudRoles, type);
  return roleAllowed && givePermissions;
};
