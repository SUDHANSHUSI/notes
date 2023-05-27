import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      }
    });
  }

  ngOnInit(): void {}

  onSearch(event: any): void {
    const term = event.target.value;
    if (term) {
      this.router.navigateByUrl('/search/' + term);
    }
  }
}
