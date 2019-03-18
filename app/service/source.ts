import { Service } from "egg"

export interface createAppObj {
  describe: "string?"
  type: "string"
  content: "string?"
  refresh: "number?"
  user_id: "number"
  id: "number"
}

/**
 * Test Service
 */
export default class source extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async getAppList(
    limit = 20,
    page = 1,
    noPage = false
  ): Promise<createAppObj[]> {
    return await this.app.mysql.select(
      "data_source",
      noPage
        ? {}
        : {
            limit: limit,
            offset: (page - 1) * limit
          }
    )
  }

  public async getApp(id: number[]): Promise<createAppObj[]> {
    const result = await this.app.mysql.select("data_source", {
      where: {
        id
      }
    })
    if (result) {
      return result
    } else {
      throw new Error("数据不存在")
    }
  }

  public async createApp(app: createAppObj): Promise<number> {
    // 执行创建
    const result = await this.app.mysql.insert("data_source", app)
    if (result.affectedRows > 0) {
      return result.insertId
    } else {
      throw new Error("创建失败")
    }
  }

  public async delApp(id: number[], userId: number): Promise<void> {
    console.log(id, userId)
    const result = await this.app.mysql.query(
      "DELETE FROM data_source WHERE id IN (?) AND user_id = ?;",
      [id, userId]
    )

    if (result.affectedRows == 0) {
      throw new Error("删除失败")
    }

    if (result.affectedRows > 0 && result.affectedRows < id.length) {
      throw new Error("部分删除成功")
    }
  }

  public async updateApp(app: createAppObj, userId: number): Promise<void> {
    const result = await this.app.mysql.update("data_source", app, {
      where: {
        id: app.id,
        user_id: userId
      }
    })
    if (result.affectedRows == 0) {
      throw new Error("更新失败")
    }
  }

  public async setStatus(
    id: number,
    status: number,
    userId: number
  ): Promise<void> {
    const result = await this.app.mysql.update(
      "data_source",
      { id, status },
      {
        where: {
          id,
          user_id: userId
        }
      }
    )
    if (result.affectedRows == 0) {
      throw new Error("更新失败")
    }
  }
}
