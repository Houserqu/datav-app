import { Service } from 'egg';

export interface createComponentObj {
  id?: 'number',
  name: 'string',
  start_time: 'string',
  end_time: 'string',
  describe: 'string',
  logo: 'string',
  access?: 'number',
  com_theme_id: 'number',
  page_theme_id: 'number',
  user_id: 'number'
}

export interface Component {
  id: 'number',
  name: 'string',
  code: 'string',
  update_time: 'string',
  create_time: 'string',
  category_name: 'string',
  category_id: 'number',
  disabled: 'number',
  describe: 'string',
  json_str: 'string'
}

export interface categoryComponent {
  id: 'number',
  name: 'string',
  icon?: 'string',
  components: 'array',
}

/**
 * Test Service
 */
export default class component extends Service {


  public async getCategory(): Promise<categoryComponent[]> {
    const category = await this.app.mysql.select('com_category');

    for (let item of category) {
      const components = await this.app.mysql.select('com', {
        where: { category_id: item.id }
      })
      item.components = components
    }

    return category
  }

  public async getComponentList(limit = 20, page = 1, noPage = false): Promise<createComponentObj[]> {
    return await this.app.mysql.select('com', noPage ? {} : {
      limit: limit,
      offset: (page - 1) * limit
    });
  }

  public async getComponent(id: number[]): Promise<createComponentObj[]> {
    const result = await this.app.mysql.select('com', {
      where: {
        id,
      }
    });
    if (result) {
      return result;
    } else {
      throw new Error('数据不存在')
    }
  }

  public async createComponent(component: createComponentObj): Promise<number> {
    // 执行创建
    const result = await this.app.mysql.insert('com', component)
    if (result.affectedRows > 0) {
      return result.insertId
    } else {
      throw new Error('创建失败')
    }
  }

  public async delComponent(id: number[], userId: number): Promise<void> {
    console.log(id, userId)
    const result = await this.app.mysql.query('DELETE FROM com WHERE id IN (?) AND user_id = ?;', [id, userId]);

    if (result.affectedRows == 0) {
      throw new Error('删除失败')
    }

    if (result.affectedRows > 0 && result.affectedRows < id.length) {
      throw new Error('部分删除成功')
    }
  }

  public async updateComponent(component: createComponentObj, userId: number): Promise<void> {
    const result = await this.app.mysql.update('com', component, {
      where: {
        id: component.id,
        user_id: userId
      }
    });
    if (result.affectedRows == 0) {
      throw new Error('更新失败')
    }
  }

  public async setStatus(id: number, status: number, userId: number): Promise<void> {
    const result = await this.app.mysql.update('com', { id, status }, {
      where: {
        id,
        user_id: userId
      }
    });
    if (result.affectedRows == 0) {
      throw new Error('更新失败')
    }
  }
}
