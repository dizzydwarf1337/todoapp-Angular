

export interface CreateTaskDto {
  title: string,
  description: string,
  userId: string,
  statusId: string,
  categoriesId: string[],
}
