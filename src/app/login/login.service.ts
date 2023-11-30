import { Injectable } from '@angular/core';
import { ApiService, LOGIN, SUPABASE_KEY, SUPABASE_URL } from '../utils/api.service';
import {
  createClient,
  SupabaseClient
} from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private supabase!: SupabaseClient

  constructor(private apiService: ApiService) {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
  }

  userLogin(body: any){
    return this.apiService.post(LOGIN, body)
  }

  supaLogin(email: string, password: string){
    return this.supabase
    .from('user_master')
    .select('user_id, fullname, email')
    .eq('email', email)
    .eq('password', password)
    .limit(1)
    
  }
}
