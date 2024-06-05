import { ParamsType } from '@wii/wau-react/lib/wau-provider';
import { ProTableProps } from '@wii/wau-react/lib/wau-table';
import { SortOrder } from 'antd/lib/table/interface';
import { useCallback, useEffect, useRef } from 'react';

/**
 * Pagination
 */
interface Pagination {
  currentPage?: number; // int32
  pageSize?: number; // int32
  total?: number; // int32
  totalPage?: number; // int32
}

/**
 * PageData
 */
interface PageData<T> {
  list?: T[];
  pagination?: Pagination;
}

export interface Sortable {
  field?: string;
  order?: string;
}

interface PaginationListParams<Q extends Record<string, any> = Record<string, any>> {
  currentPage?: number; // int32
  pageSize?: number; // int32
  query?: Q;
  sorts?: /* Sortable */ Sortable[];
}

type TableRequest<T, P extends ParamsType = Record<string, any>> = Required<ProTableProps<T, P>>['request'];

type RequestFnParams<T, P extends ParamsType = Record<string, any>> = Parameters<TableRequest<T, P>>;

type RequestFn<T, P extends ParamsType = Record<string, any>> = (
  ...args: RequestFnParams<T, P>
) => Promise<PageData<T>>;

type PaginationRequestFn<T, P extends ParamsType = Record<string, any>> = (
  params: PaginationListParams<P>,
) => Promise<PageData<T>>;

type ListRequestFn<T, P extends ParamsType = Record<string, any>> = (
  ...args: RequestFnParams<T, P>
) => Promise<Array<T>>;

export function useTableRequest<T = Record<string, any>, P extends ParamsType = Record<string, any>>(
  fn: RequestFn<T, P>,
) {
  const ref = useRef<RequestFn<T, P>>(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);
  const request = useCallback<Required<ProTableProps<T, P>>['request']>(async (params, sort, filter) => {
    try {
      const res = await ref.current?.(params, sort, filter);
      return {
        data: res.list,
        success: true,
        total: res.pagination?.total,
      };
    } catch (error) {
      return {
        data: [],
        total: 0,
        success: true,
      };
    }
  }, []);

  return request;
}

export function useListTableRequest<T = Record<string, any>, P extends ParamsType = Record<string, any>>(
  fn: ListRequestFn<T, P>,
) {
  const ref = useRef<ListRequestFn<T, P>>(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);
  const request = useCallback<Required<ProTableProps<T, P>>['request']>(async (params, sort, filter) => {
    try {
      const res = await ref.current?.(params, sort, filter);
      return {
        data: res,
        success: true,
      };
    } catch (error) {
      return {
        data: [],
        success: true,
      };
    }
  }, []);

  return request;
}

export function usePaginationTableRequest<T = Record<string, any>, P extends ParamsType = Record<string, any>>(
  fn: PaginationRequestFn<T, P>,
) {
  const request = useTableRequest(({ current, pageSize, ...query }, sort = {}) => {
    const sorts: Sortable[] = Object.entries(sort).map(([field, order]: [string, SortOrder]) => ({
      field,
      order: order?.replace('end', ''),
    }));
    return fn({
      currentPage: current,
      pageSize,
      query: query as any,
      sorts,
    });
  });

  return request;
}
