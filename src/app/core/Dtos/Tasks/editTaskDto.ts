

export interface EditTaskDto {
  taskId: string,
  title: string,
  description: string,
  statusId: string,
  categoriesId:string[],
}
