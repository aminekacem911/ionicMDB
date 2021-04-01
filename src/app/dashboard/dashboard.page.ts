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
  searchTitle = '';

  movieApiUrl = '';
  movieData = {
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
    console.log('searching film ' + encodeURIComponent(this.searchTitle).trim());
    const search = encodeURIComponent(this.searchTitle).trim();

    //http://www.omdbapi.com/?apikey=VOTRE_CLÉ_API&t='iron%20man.
    //this.movieApiUrl = 'http://www.omdbapi.com/?apikey=ffb23b0&t=' + search;
    this.movieApiUrl = 'http://127.0.0.1:8000/api/search?key=' + search;
    this.readAPI(this.movieApiUrl)
      .subscribe((data) => {
      console.log(data);
      this.movieData.title = data['result']['title'];
      this.movieData.length = data['result']['length'];
      this.movieData.year = data['result']['year'];
      this.movieData.description = data['result']['plot'];
      this.movieData.image = data['result']['poster'];
      this.movieData.trailer = data['result']['trailer']['link'];
      this.movieData.rating =data['result']['rating']

    });
  }
  }
