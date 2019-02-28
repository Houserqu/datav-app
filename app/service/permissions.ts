import { Service } from 'egg';

export interface createPermissionObj {
  type: string;
  code: string;
  app: string;
  id?: number;
}

/**
 * Test Service
 */
export default class permissions extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async getPermissionsList(limit = 20, page = 1, noPage = false): Promise<createPermissionObj[]> {
    return await this.app.mysql.select('permission', noPage ? {} : {
      limit: limit,
      offset: (page - 1) * limit
    });
  }

  public async getPermission(id: number): Promise<createPermissionObj> {
    const result = await this.app.mysql.get('permission', { id });
    if(result) {
      return result;
    } else {
      throw new Error('数据不存在')
    }
  }

  public async createPermission(permission: createPermissionObj): Promise<number> {
    
    // 检查是否已经存在
    const check = await this.app.mysql.get('permission', { code: permission.code, app: permission.app })
    if(check) {
      throw new Error('权限已存在')
    }

    // 执行创建
    const result = await this.app.mysql.insert('permission', permission)
    if(result.affectedRows > 0) {
      return result.insertId
    } else {
      throw new Error('创建失败')
    }
  }

  public async delPermission(id: number): Promise<void> {
    const result = await this.app.mysql.delete('permission', { id });

    if (result.affectedRows = 0) {
      throw new Error('删除失败')
    }
  }

  public async updatePermission(permission: createPermissionObj): Promise<void> {
    // 检查是否已经存在
    const check = await this.app.mysql.get('permission', { code: permission.code, app: permission.app })
    if(check) {
      throw new Error('权限已存在')
    }

    const result = await this.app.mysql.update('permission', permission);
    if (result.affectedRows = 0) {
      throw new Error('更新失败')
    }
  }
}
