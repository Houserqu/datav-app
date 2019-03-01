import { Service } from 'egg';

export interface createAppObj {
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

/**
 * Test Service
 */
export default class app extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async getAppList(limit = 20, page = 1, noPage = false): Promise<createAppObj[]> {
    return await this.app.mysql.select('app', noPage ? {} : {
      limit: limit,
      offset: (page - 1) * limit
    });
  }

  public async getApp(id: number[]): Promise<createAppObj[]> {
    const result = await this.app.mysql.select('app', {
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

  public async createApp(app: createAppObj): Promise<number> {
    // 执行创建
    const result = await this.app.mysql.insert('app', app)
    if (result.affectedRows > 0) {
      return result.insertId
    } else {
      throw new Error('创建失败')
    }
  }

  public async delApp(id: number[], userId: number): Promise<void> {
    console.log(id, userId)
    const result = await this.app.mysql.query('DELETE FROM app WHERE id IN (?) AND user_id = ?;', [id, userId]);

    if (result.affectedRows == 0) {
      throw new Error('删除失败')
    }

    if (result.affectedRows > 0 && result.affectedRows < id.length) {
      throw new Error('部分删除成功')
    }
  }

  public async updateApp(app: createAppObj, userId: number): Promise<void> {
    const result = await this.app.mysql.update('app', app, {
      where: {
        id: app.id,
        user_id: userId
      }
    });
    if (result.affectedRows == 0) {
      throw new Error('更新失败')
    }
  }

  public async setStatus(id: number, status: number, userId: number): Promise<void> {
    const result = await this.app.mysql.update('app', { id, status }, {
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
