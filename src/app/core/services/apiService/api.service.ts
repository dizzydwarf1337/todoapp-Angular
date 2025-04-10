import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/ApiResponse';
import { LoginDto } from '../../Dtos/Auth/loginDto';
import { User } from '../../models/user';
import { RegisterDto } from '../../Dtos/Auth/registerDto';
import { CreateCategoryDto } from '../../Dtos/Categories/CreateCategoryDto';
import { Category } from '../../models/category';
import { EditCategoryDto } from '../../Dtos/Categories/EditCategoryDto';
import { Status } from '../../models/status';
import { CreateStatusDto } from '../../Dtos/Statuses/createStatusDto';
import { EditStatusDto } from '../../Dtos/Statuses/editStatusDto';
import { Task } from '../../models/task';
import { CreateTaskDto } from '../../Dtos/Tasks/createTaskDto';
import { EditTaskDto } from '../../Dtos/Tasks/editTaskDto';
import { EditTaskStatusDto } from '../../Dtos/Tasks/editTaskStatusDto';
import { EditTaskCategoriesDto } from '../../Dtos/Tasks/editTaskCategoriesDto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  private addAuth(noAuth: boolean): HttpHeaders {
    let headers = new HttpHeaders();
    if (!noAuth) {
      const tokenJson = localStorage.getItem("todo-app-token");
      if (tokenJson) {
        const token = JSON.parse(tokenJson);
        headers = headers.set('Authorization', token);
      }
    } else {
      headers = headers.set('NoAuth', 'true');
    }
    return headers;
  }


  private requests = {
    get: <T>(url: string, noAuth = false): Observable<T> =>
      this.http.get<T>(`${this.baseUrl}/${url}`, { headers: this.addAuth(noAuth) }),

    post: <T>(url: string, body: {}, noAuth = false): Observable<T> =>
      this.http.post<T>(`${this.baseUrl}/${url}`, body, { headers: this.addAuth(noAuth) }),

    put: <T>(url: string, body: {}, noAuth = false): Observable<T> =>
      this.http.put<T>(`${this.baseUrl}/${url}`, body, { headers: this.addAuth(noAuth) }),

    delete: <T>(url: string, body: {}, noAuth = false): Observable<T> =>
      this.http.delete<T>(`${this.baseUrl}/${url}`, { headers: this.addAuth(noAuth) }),

    patch: <T>(url: string, body: {}, noAuth = false): Observable<T> =>
      this.http.patch<T>(`${this.baseUrl}/${url}`, body, { headers: this.addAuth(noAuth) }),
  };

  Auth = {
    Login: (loginDto: LoginDto, noAuth = true) => this.requests.post<ApiResponse<User>>("auth/public/login", loginDto, noAuth),
    Register: (registerDto: RegisterDto, noAuth = true) => this.requests.post<ApiResponse<string>>("auth/public/register", registerDto, noAuth),
  };
  Categories = {
    GetCategoryById: (categoryId: string, noAuth = false) => this.requests.get<ApiResponse<Category>>(`categories/${categoryId}`, noAuth),
    GetUserCategories: (userId: string, noAuth = false) => this.requests.get<ApiResponse<Category[]>>(`categories/user/${userId}`, noAuth),
    CreateCategory: (createCategoryDto: CreateCategoryDto, noAuth = false) => this.requests.post<ApiResponse<string>>(`categories/create`, createCategoryDto, noAuth),
    DeleteCategory: (categoryId: string, noAuth = false) => this.requests.delete<ApiResponse<string>>(`categories/delete/${categoryId}`, noAuth),
    EditCategory: (editCategoryDto: EditCategoryDto, noAuth = false) => this.requests.put<ApiResponse<string>>("categories/edit", editCategoryDto, noAuth),
  }
  Statuses = {
    GetStatusById: (statusId: string, noAuth = false) => this.requests.get<ApiResponse<Status>>(`statuses/${statusId}`, noAuth),
    GetStatusesByUserId: (userId: string, noAuth = false) => this.requests.get<ApiResponse<Status[]>>(`statuses/user/${userId}`, noAuth),
    CreateStatus: (createStatusDto: CreateStatusDto, noAuth = false) => this.requests.post<ApiResponse<string>>("statuses/create", createStatusDto, noAuth),
    DeleteStatus: (statusId: string, noAuth = false) => this.requests.delete<ApiResponse<string>>(`statuses/delete/${statusId}`, noAuth),
    EditStatus: (editStatusDto: EditStatusDto, noAuth = false) => this.requests.put<ApiResponse<string>>("statuses/edit", editStatusDto, noAuth),
  }
  Tasks = {
    GetTaskById: (taskId: string, noAuth = false) => this.requests.get<ApiResponse<Task>>(`tasks/${taskId}`, noAuth),
    GetTasksByUserId: (userId: string, noAuth = false) => this.requests.get<ApiResponse<Task[]>>(`tasks/user/${userId}`, noAuth),
    CreateTask: (createTaskDto: CreateTaskDto, noAuth = false) => this.requests.post<ApiResponse<string>>("tasks/create", createTaskDto, noAuth),
    DeleteTask: (taskId: string, noAuth = false) => this.requests.delete<ApiResponse<string>>(`tasks/delete/${taskId}`, noAuth),
    EditTask: (editTaskDto: EditTaskDto, noAuth = false) => this.requests.put<ApiResponse<string>>("tasks/edit", editTaskDto, noAuth),
    EditStatus: (editTaskStatusDto: EditTaskStatusDto, noAuth = false) => this.requests.patch<ApiResponse<string>>("tasks/updateStatus", editTaskStatusDto, noAuth),
    EditCategories: (editTaskCategoriesDto: EditTaskCategoriesDto, noAuth = false) => this.requests.patch<ApiResponse<string>>("tasks/updateCategories", editTaskCategoriesDto, noAuth),
  }
  Users = {
    DeleteUser: (userId: string, noAuth = false) => this.requests.delete < ApiResponse<string>>(`users/delete/${userId}`,noAuth),
  }

}
