import { Service } from 'egg';

export interface createRoleObj {
  name: string;
  code: string;
  id?: number;
}

export interface RolePermission {
  role_id: number, 
  permission_ids: string
}

/**
 * Test Service
 */
export default class Roles extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async getRolesList(limit = 20, page = 1) {
    return await this.app.mysql.select('role', {
      limit: limit,
      offset: (page - 1) * limit
    });
  }

  public async getRole(id: number) {
    return await this.app.mysql.get('role', { id });
  }

  public async createRole(role: createRoleObj) {
    const check = await this.app.mysql.get('role', { code: role.code, name: role.name })
    
    if(check) {
      throw new Error('角色已存在')
    }

    // 执行创建
    const result = await this.app.mysql.insert('role', role)
    if(result.affectedRows > 0) {
      return result.insertId
    } else {
      throw new Error('创建失败')
    }
  }

  public async delRole(id: number) {
    return await this.app.mysql.delete('role', { id });
  }

  public async updateRole(role: createRoleObj) {
    // 检查是否已经存在
    const check = await this.app.mysql.get('permission', { code: role.name, name: role.code })
    if(check) {
      throw new Error('角色已存在')
    }

    const result = await this.app.mysql.update('role', role);
    if (result.affectedRows = 0) {
      throw new Error('更新失败')
    }
  }

  public async getRolePermissions(roleId: number): Promise<createRoleObj[]> {
    // 获取角色的权限 ids
    const relation = await this.app.mysql.get('role_permission', { role_id: roleId })

    if(relation.permission_ids) {

      // 获取权限
      const ids_arr = relation.permission_ids.split(',').map(v => parseInt(v));

      const permissions = await this.app.mysql.select('permission', { 
        where: { id: ids_arr }
      })

      return permissions
    } else {
      return []
    }
  }

  // 获取用户权限
  public async getUserPermissions(userId: number): Promise<createRoleObj[]> {
    // 获取角色的权限 ids
    const relation = await this.app.mysql.get('user-role', { user_id: userId })
    console.log(relation)

    if(relation) {
      return this.getRolePermissions(relation.role_id)
    } else {
      return []
    }
  }

  // 更新角色权限
  public async updateRolePermissions(rolePermission: RolePermission) {
    return await this.app.mysql.update('role_permission', rolePermission, {
      where: { role_id: rolePermission.role_id }
    })
  }
}
