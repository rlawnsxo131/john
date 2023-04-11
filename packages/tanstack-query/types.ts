import type {
  InfiniteData,
  QueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export type UseQueryOptionsOf<T extends (...args: any) => any> =
  UseQueryOptions<
    Awaited<ReturnType<T>>,
    unknown,
    Awaited<ReturnType<T>>,
    any[]
  >;

export type UseInfiniteQueryOptionsOf<T extends (...args: any) => any> =
  QueryOptions<
    Awaited<ReturnType<T>>,
    unknown,
    InfiniteData<Awaited<ReturnType<T>>>,
    any[]
  >;

export type UseMutationOptionsOf<
  T extends (...args: any) => any,
  E = any,
> = UseMutationOptions<Awaited<ReturnType<T>>, E, Parameters<T>[0]>;
