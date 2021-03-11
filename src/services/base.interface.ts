export interface BaseService<TModel, TModelAttributes> {
  getAll: () => Promise<TModel[]>,
  create: (model: TModelAttributes) => Promise<TModel>,
  update: (id: number, model: TModelAttributes) => Promise<TModel>,
  getById: (id: number) => Promise<TModel>,
  deleteById: (id: number) => Promise<void>,
}