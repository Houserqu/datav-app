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


  public async getCategoryWithComponent(): Promise<categoryComponent[]> {
    const category = await this.app.mysql.select('com_category');

    for (let item of category) {
      const components = await this.app.mysql.select('com', {
        where: { category_id: item.id }
      })
      item.components = components
    }

    return category
  }

  public async getCategoryList(): Promise<createComponentObj[]> {
    return await this.app.mysql.select('category');
  }
}
