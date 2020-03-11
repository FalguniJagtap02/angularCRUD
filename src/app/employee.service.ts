import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:3000";

  get() {
    return this.http.get(this.baseUrl + '/employees')
  }

  post(data) {
    return this.http.post(this.baseUrl + '/employees/add', data)
  }

  update(data) {
    return this.http.put(this.baseUrl + '/employees/' + data.id + '/edit', data)
  }

  delete(id) {
    return this.http.delete(this.baseUrl + '/employees/' + id)
  }
}
