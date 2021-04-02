// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  key = '';

  Apiurl = '';
  movie = {
    title: '',
    length:'',
    description: '',
    image: '',
    year: '',
    trailer :'',
    rating:''
  };
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private http: HttpClient,

  ) {}

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('/login');
      }
    }, err => {
      console.log('err', err);
    })

  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })


  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }
  searchMovie() {
   
    const search = encodeURIComponent(this.key).trim();
    this.Apiurl = 'http://127.0.0.1:8000/api/search?key=' + search;
    this.readAPI(this.Apiurl)
      .subscribe((data) => {
      console.log(data);
      this.movie.title = data['result']['title'];
      this.movie.length = data['result']['length'];
      this.movie.year = data['result']['year'];
      this.movie.description = data['result']['plot'];
      this.movie.image = data['result']['poster'];
      this.movie.trailer = data['result']['trailer']['link'];
      this.movie.rating =data['result']['rating']

    });
  }
  }
