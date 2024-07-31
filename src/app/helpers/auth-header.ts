import { HttpHeaders } from '@angular/common/http';

export function authHeader(): { headers: HttpHeaders } {
  const token = localStorage.getItem('idToken');
  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set('Authorization', 'Bearer ' + token);
  }
  return { headers };
}
