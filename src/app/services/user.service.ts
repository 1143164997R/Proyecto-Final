import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url_server = "https://music-back-seminario.herokuapp.com/";
  users: any;
  searching = false;
  text="Busque usuario";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
     'Access-Control-Request-Headers': '*', observe: 'response' })
  };

  constructor(
	private http: HttpClient
  ) { }

  getCurrentUser(id){
    return this.http.get(`${this.url_server}current_user/${id}`, this.httpOptions)
   }

  getUser(keyword){
    let params = {
        "q": keyword
      }
    
    return this.http.post(`${this.url_server}find_user`, params, this.httpOptions)
  }

  followUser(followee_id, user_id){
    let params={
      "followee_id": followee_id
    }
    return this.http.post(`${this.url_server}follow/${user_id}`, params, this.httpOptions)
  }

   updateUser(id, user){
    let params = {
      "user": user
    }
    return new Promise((accept, reject)=>{
      this.http.post(`${this.url_server}update/${id}`, params,
       this.httpOptions).subscribe((data:any)=>{
        if(data.status = "OK"){
          accept(data)
        }else{
          reject(data.errors)
        }
      },
      (error)=>{
        reject(error)
      }
      )
    })
  }

}