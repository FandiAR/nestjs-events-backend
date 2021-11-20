import { Expose } from 'class-transformer';
import { SelectQueryBuilder } from 'typeorm';

export interface PaginateOptions {
  perPage: number;
  currentPage: number;
  total?: boolean;
}

export class PaginationResult<T> {
  constructor(partial: Partial<PaginationResult<T>>) {
    Object.assign(this, partial);
  }
  @Expose()
  first: number;
  @Expose()
  last: number;
  @Expose()
  perPage: number;
  @Expose()
  total?: number;
  @Expose()
  data: T[];
}

export async function paginate<T>(
  qb: SelectQueryBuilder<T>,
  options: PaginateOptions = {
    perPage: 2,
    currentPage: 1,
  },
): Promise<PaginationResult<T>> {
  const offset = (options.currentPage - 1) * options.perPage;
  const data = await qb.limit(options.perPage).offset(offset).getMany();

  return new PaginationResult({
    first: offset + 1,
    last: offset + data.length,
    perPage: options.perPage,
    total: options.total ? await qb.getCount() : null,
    data,
  });
}
