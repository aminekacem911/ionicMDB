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
    description: '',
    imageUrl: ''
  };
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private http: HttpClient,

  ) {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Methods', 'GET')
    .append('Access-Control-Allow-Origin', '*');

    // this.readAPI('http://127.0.0.1:8000/api/search&key=matrix',{headers});
    // //this.readAPI('http://www.omdbapi.com/?i=tt3896198&apikey=ffb23b0').
    //     subscribe((data) => {
    //     console.log(data);
    //   });
  }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('');
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
    console.log('recherche du film ' + encodeURIComponent(this.searchTitle).trim());
    const search = encodeURIComponent(this.searchTitle).trim();

    this.movieApiUrl = 'http://127.0.0.1:8000/api/search?key=' + search;

    this.readAPI(this.movieApiUrl)
      .subscribe((data) => {
      console.log(data);

    });
  }
  }
