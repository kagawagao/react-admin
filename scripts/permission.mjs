/**
 * 处理权限
 */
import { transformFileAsync } from '@babel/core';
import chalk from 'chalk';
import globby from 'globby';
import fs from 'node:fs';
import path from 'node:path';
import signale from 'signale';
import babelConfig from '../babel.config.js';

const permissionDir = path.resolve(process.cwd(), 'permissions');

const pattern = './src/**/*.(js|jsx|ts|tsx)';

function dedupedFilter(permissions, file) {
  const storedPermissions = {};
  const removedPermissions = [];
  const filteredPermissions = permissions.filter((permission) => {
    const { code, name } = permission;
    const storedPermission = storedPermissions[code];
    if (!storedPermission) {
      storedPermissions[code] = permission;
      return true;
    } else {
      if (storedPermission.code === code && storedPermission.name !== name) {
        removedPermissions.push(permission);
        console.error(
          chalk.redBright(
            `[${chalk.bold(code + ': ' + name)}] 与 [${chalk.bold(storedPermission.code + ': ' + storedPermission.name)}] 冲突`,
          ),
        );
        console.error(chalk.redBright(file));
        // padding
        console.log();
      }
      return false;
    }
  });
  return {
    removedPermissions,
    filteredPermissions,
  };
}
async function run() {
  try {
    const files = await globby(pattern, {
      gitignore: true,
      cwd: path.resolve(process.cwd()),
    });
    let permissions = [];
    let hasError = false;
    await Promise.all(
      files
        .filter((file) => !file.endsWith('.d.ts'))
        .map(async (file) => {
          const fullPath = path.resolve(process.cwd(), file);
          await transformFileAsync(fullPath, {
            ...babelConfig,
            plugins: [
              [
                '@pixas/babel-plugin-permission',
                {
                  onPermissionExtracted: (file, items) => {
                    permissions.push(
                      ...items.map((item) => {
                        const permission = {
                          ...item,
                          name: item.name || item.code,
                          // 提取到的权限标记为默认权限
                          defaultData: 1,
                        };

                        if (!permission.groups) {
                          permission.groups = [];
                        }

                        if (!permission.uris) {
                          permission.uris = [];
                        } else {
                          permission.uris = permission.uris.map((item) => {
                            if (typeof item === 'string') {
                              return {
                                uri: item,
                                method: 'GET',
                              };
                            } else {
                              return item;
                            }
                          });
                        }
                        return permission;
                      }),
                    );
                    const { filteredPermissions, removedPermissions } = dedupedFilter(permissions, file);
                    permissions = filteredPermissions;
                    if (removedPermissions.length) {
                      hasError = true;
                    }
                  },
                },
              ],
            ],
          });
        }),
    );
    const codes = permissions.map(({ code }) => code);
    const groupedPermissions = {
      all: [],
    };
    permissions.forEach((permission) => {
      if (permission.parent && !codes.includes(permission.parent)) {
        hasError = true;
        console.error(
          chalk.redBright(
            `[${chalk.bold(permission.code + ': ' + permission.name)}] 所需的父权限 [${chalk.bold(permission.parent)}] 不存在`,
          ),
        );
      } else {
        groupedPermissions.all.push(permission);
        const { groups = [] } = permission;
        groups.forEach((group) => {
          if (!groupedPermissions[group]) {
            groupedPermissions[group] = [];
          }
          groupedPermissions[group].push(permission);
        });
      }
    });

    // 清理目录
    await fs.promises.rm(permissionDir, {
      recursive: true,
      force: true,
    });
    if (hasError) {
      signale.error(chalk.redBright('权限信息提取失败'));
      process.exit(1);
    } else {
      signale.pending(chalk.magentaBright('正在写入文件'));
      console.log();
      if (!fs.existsSync(permissionDir)) {
        await fs.promises.mkdir(permissionDir);
      }
      await Promise.all(
        Object.entries(groupedPermissions).map(async ([key, permissions]) => {
          const filePath = path.resolve(permissionDir, `${key}.json`);
          await fs.promises.writeFile(filePath, JSON.stringify(permissions, null, 2), {
            encoding: 'utf-8',
          });
        }),
      );
      signale.success(chalk.greenBright('权限信息提取完成'));
      process.exit(0);
    }
  } catch (error) {
    console.error(error);
    signale.error(chalk.redBright(error.message));
    process.exit(1);
  }
}
run();
