import type { ARC } from 'axios';
import type { CommonResponseData } from '..';

export interface UserPayload {
    username: string;
    password: string;
}

/**
 * @description 注册用户
 */
export function API_USER_REGISTER(data: UserPayload): ARC<CommonResponseData<boolean>> {
    return {
        url: '/api/user/register',
        method: 'post',
        data,
    };
}

/**
 * @description 用户登陆
 */
export function API_USER_LOGIN(data: UserPayload): ARC<CommonResponseData<boolean>> {
    return {
        url: '/api/user/login',
        method: 'post',
        data,
    };
}

/**
 * 添加分类
 */
export interface CategoryPayload {
    categoryName: string;
    categoryDesc: string;
}

/**
 * @description 增加分类
 */
export function API_CATEGORY_ADD(data: CategoryPayload): ARC<CommonResponseData<boolean>> {
    return {
        url: '/api/category/add',
        method: 'post',
        data,
    };
}

/**
 * @description 编辑分类
 */
export function API_CATEGORY_EDIT(data: CategoryPayload): ARC<CommonResponseData<boolean>> {
    return {
        url: '/api/category/edit',
        method: 'post',
        data,
    };
}

export interface CategoryRow {
    id: number;
    categoryName: string;
    categoryDesc: string;
}

/**
 * @description 查询分类
 */
export function API_GET_CATEGORY_LIST(): ARC<CommonResponseData<CategoryRow[]>> {
    return {
        url: '/api/category/list',
        method: 'get',
    };
}

/**
 * @description 删除分类
 */
export function API_CATEGORY_DELETE(id: number): ARC<CommonResponseData<CategoryRow[]>> {
    return {
        url: '/api/category/delete',
        method: 'post',
        data: { id },
    };
}

export interface EditArticlesPayload {
    id?: number;
    title: string;
    content: string;
    articleDesc: string;
    categoryId: number;
}

export interface ArticlesRow extends EditArticlesPayload {
    createTime: number;
    updateTime: number;
    viewCount: number;
    author: string;
}

/**
 * @description 增加分类
 */
export function API_ARTICLES_ADD(data: EditArticlesPayload): ARC<CommonResponseData<boolean>> {
    return {
        url: '/api/article/add',
        method: 'post',
        data,
    };
}

/**
 * @description 编辑分类
 */
export function API_ARTICLES_EDIT(data: EditArticlesPayload): ARC<CommonResponseData<boolean>> {
    return {
        url: '/api/article/edit',
        method: 'post',
        data,
    };
}

/**
 * @description 删除分类
 */
export function API_ARTICLES_DELETE(id: number): ARC<CommonResponseData<boolean>> {
    return {
        url: '/api/article/delete',
        method: 'post',
        data: { id },
    };
}

export interface PageDto {
    pageNum: number;
    pageSize: number;
    total?: number;
}

interface GetArticleListPayload extends PageDto {
    title?: string;
}

/**
 * @description 查询文章列表
 */
export function API_GET_ARTICLE_LIST(data: GetArticleListPayload): ARC<CommonResponseData<ArticlesRow[]>> {
    return {
        url: '/api/article/list',
        method: 'post',
        data,
    };
}
